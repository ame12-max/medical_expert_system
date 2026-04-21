:- use_module(library(http/json)).
:- use_module(library(lists)).
:- use_module(library(apply)).

% ============================================
% DISEASE KNOWLEDGE BASE
% ============================================

disease_symptoms(malaria, 
    [fever, headache, chills, sweating, nausea, fatigue, muscle_pain],
    [fever, chills]).

disease_symptoms(typhoid,
    [prolonged_fever, headache, abdominal_pain, constipation_or_diarrhea, weakness, loss_of_appetite, rose_spots],
    [prolonged_fever, abdominal_pain]).

disease_symptoms(flu_influenza,
    [fever, cough, sore_throat, runny_nose, body_aches, fatigue, headache, chills],
    [fever, body_aches]).

disease_symptoms(covid19,
    [fever, dry_cough, tiredness, loss_of_taste_or_smell, difficulty_breathing, chest_pain, confusion],
    [loss_of_taste_or_smell, dry_cough]).

disease_symptoms(common_cold,
    [runny_nose, sneezing, sore_throat, mild_cough, congestion, watery_eyes],
    [runny_nose, sneezing]).

disease_symptoms(dengue,
    [high_fever, severe_headache, pain_behind_eyes, joint_muscle_pain, rash, nausea, vomiting, swollen_glands],
    [high_fever, severe_headache, pain_behind_eyes]).

disease_symptoms(meningitis,
    [severe_headache, stiff_neck, fever, nausea, sensitivity_to_light, confusion, vomiting, seizure],
    [severe_headache, stiff_neck, fever]).

disease_symptoms(pneumonia,
    [cough_with_phlegm, fever, chills, difficulty_breathing, chest_pain, fatigue, nausea, vomiting],
    [cough_with_phlegm, difficulty_breathing]).

disease_symptoms(bronchitis,
    [persistent_cough, mucus_production, fatigue, shortness_of_breath, fever, chest_discomfort],
    [persistent_cough, mucus_production]).

disease_symptoms(strep_throat,
    [sore_throat, painful_swallowing, fever, swollen_lymph_nodes, red_spots_on_roof_of_mouth, headache],
    [sore_throat, painful_swallowing]).

% ============================================
% UTILITY PREDICATES
% ============================================

all_symptoms(Symptoms) :-
    findall(Symptom, (disease_symptoms(_, SymptomList, _), member(Symptom, SymptomList)), All),
    sort(All, Symptoms).

all_diseases(Diseases) :-
    findall(Disease, disease_symptoms(Disease, _, _), UniqueDiseases),
    sort(UniqueDiseases, Diseases).

% ============================================
% DIAGNOSIS ENGINE
% ============================================

disease_score(Disease, UserSymptoms, Score) :-
    disease_symptoms(Disease, AllSymptoms, CriticalSymptoms),
    
    intersection(AllSymptoms, UserSymptoms, MatchedSymptoms),
    length(MatchedSymptoms, MatchedCount),
    length(AllSymptoms, TotalCount),
    
    intersection(CriticalSymptoms, UserSymptoms, MatchedCritical),
    length(MatchedCritical, CriticalMatchedCount),
    length(CriticalSymptoms, CriticalTotalCount),
    
    (TotalCount > 0 -> SymptomScore is (MatchedCount / TotalCount) * 70 ; SymptomScore = 0),
    (CriticalTotalCount > 0 -> CriticalScore is (CriticalMatchedCount / CriticalTotalCount) * 30 ; CriticalScore = 0),
    Score is SymptomScore + CriticalScore,
    Score >= 0.

diagnose(UserSymptoms, Results) :-
    all_diseases(Diseases),
    findall(Score-Disease, (member(Disease, Diseases), disease_score(Disease, UserSymptoms, Score), Score >= 15), AllScores),
    predsort(compare_scores, AllScores, SortedScores),
    Results = SortedScores.

compare_scores(Order, Score1-_, Score2-_) :-
    (Score1 > Score2 -> Order = (<) ;
     Score1 < Score2 -> Order = (>) ;
     Order = (=)).

% ============================================
% JSON OUTPUT - FIXED
% ============================================

print_symptoms_json :-
    all_symptoms(Symptoms),
    json_write(current_output, Symptoms),
    nl.

print_diagnosis_json(UserSymptoms) :-
    diagnose(UserSymptoms, Results),
    format_json_diagnosis(Results).

format_json_diagnosis([]) :-
    json_write(current_output, json([diseases=[]])).
format_json_diagnosis(Results) :-
    findall(json([name=Disease, confidence=Confidence]),
            (member(Score-Disease, Results), Confidence is round(Score)),
            JsonList),
    json_write(current_output, json([diseases=JsonList])).

% ============================================
% COMMAND LINE INTERFACE
% ============================================

extract_symptoms_value(Arg, SymptomsList) :-
    sub_atom(Arg, 0, 11, _, '--symptoms='),
    sub_atom(Arg, 11, _, 0, ValueAtom),
    atom_string(ValueAtom, ValueStr),
    atom_to_term(ValueStr, SymptomsList, _),
    is_list(SymptomsList).

main :-
    current_prolog_flag(argv, Argv),
    ( member('--get-symptoms', Argv) ->
        print_symptoms_json,
        halt(0)
    ; member('--diagnose', Argv) ->
        ( member(Arg, Argv), extract_symptoms_value(Arg, Symptoms) ->
            print_diagnosis_json(Symptoms),
            halt(0)
        ; format(user_error, '{"error": "Invalid or missing --symptoms=... argument"}~n', []),
          halt(1)
        )
    ; format(user_error, 'Usage: swipl knowledge.pl --get-symptoms OR --diagnose --symptoms="[fever,headache]"~n', []),
      halt(1)
    ).

:- initialization(main, main).