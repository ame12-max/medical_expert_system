:- use_module(library(http/json)).
:- use_module(library(lists)).
:- use_module(library(apply)).

% =====================================================================
% ENHANCED MEDICAL KNOWLEDGE BASE – More diseases, treatments, precautions
% =====================================================================

% disease_symptoms(Disease, SymptomsList, CriticalSymptomsList)
% SymptomsList: all possible symptoms of the disease
% CriticalSymptomsList: symptoms that are mandatory for high confidence

disease_symptoms(malaria,
    [fever, headache, chills, sweating, nausea, fatigue, muscle_pain, vomit, diarrhea],
    [fever, chills]).

disease_symptoms(typhoid,
    [prolonged_fever, headache, abdominal_pain, constipation_or_diarrhea, weakness, loss_of_appetite, rose_spots, bradycardia],
    [prolonged_fever, abdominal_pain]).

disease_symptoms(flu_influenza,
    [fever, cough, sore_throat, runny_nose, body_aches, fatigue, headache, chills, sneezing],
    [fever, body_aches]).

disease_symptoms(covid19,
    [fever, dry_cough, tiredness, loss_of_taste_or_smell, difficulty_breathing, chest_pain, confusion, sore_throat, diarrhea],
    [loss_of_taste_or_smell, dry_cough]).

disease_symptoms(common_cold,
    [runny_nose, sneezing, sore_throat, mild_cough, congestion, watery_eyes, mild_fatigue],
    [runny_nose, sneezing]).

disease_symptoms(dengue,
    [high_fever, severe_headache, pain_behind_eyes, joint_muscle_pain, rash, nausea, vomiting, swollen_glands, bleeding_gums],
    [high_fever, severe_headache, pain_behind_eyes]).

disease_symptoms(meningitis,
    [severe_headache, stiff_neck, fever, nausea, sensitivity_to_light, confusion, vomiting, seizure, rash],
    [severe_headache, stiff_neck, fever]).

disease_symptoms(pneumonia,
    [cough_with_phlegm, fever, chills, difficulty_breathing, chest_pain, fatigue, nausea, vomiting, confusion],
    [cough_with_phlegm, difficulty_breathing]).

disease_symptoms(bronchitis,
    [persistent_cough, mucus_production, fatigue, shortness_of_breath, fever, chest_discomfort, wheezing],
    [persistent_cough, mucus_production]).

disease_symptoms(strep_throat,
    [sore_throat, painful_swallowing, fever, swollen_lymph_nodes, red_spots_on_roof_of_mouth, headache, rash],
    [sore_throat, painful_swallowing]).

% ======================= Additional Diseases =======================

disease_symptoms(tuberculosis,
    [persistent_cough, weight_loss, night_sweats, fever, fatigue, chest_pain, coughing_blood, loss_of_appetite],
    [persistent_cough, coughing_blood, night_sweats]).

disease_symptoms(urinary_tract_infection,
    [frequent_urination, burning_urination, cloudy_urine, pelvic_pain, fever, fatigue, nausea],
    [burning_urination, frequent_urination]).

disease_symptoms(gastroenteritis,
    [diarrhea, nausea, vomiting, abdominal_cramps, mild_fever, headache, bloating],
    [diarrhea, vomiting]).

disease_symptoms(sinusitis,
    [facial_pressure, nasal_congestion, thick_nasal_discharge, headache, fever, cough, bad_breath],
    [facial_pressure, thick_nasal_discharge]).

disease_symptoms(allergic_rhinitis,
    [sneezing, runny_nose, itchy_eyes, nasal_congestion, watery_eyes, fatigue],
    [sneezing, itchy_eyes]).

disease_symptoms(asthma,
    [wheezing, shortness_of_breath, chest_tightness, coughing, difficulty_breathing_at_night],
    [wheezing, shortness_of_breath]).

disease_symptoms(chickenpox,
    [rash, fever, fatigue, headache, loss_of_appetite, red_spots],
    [rash, fever]).

disease_symptoms(hepatitis_a,
    [fatigue, nausea, abdominal_pain, loss_of_appetite, jaundice, dark_urine, fever],
    [jaundice, fatigue]).

disease_symptoms(measles,
    [fever, cough, runny_nose, conjunctivitis, rash, koplik_spots],
    [rash, fever, koplik_spots]).

% ======================= Treatment Plans =======================

% disease_treatment(Disease, ListOfTreatmentSteps)

disease_treatment(malaria,
    [ "Antimalarial drugs (artemisinin‑based combination therapy)",
      "Rest and hydration",
      "Fever management with paracetamol",
      "Seek medical attention immediately"
    ]).

disease_treatment(typhoid,
    [ "Antibiotics (ciprofloxacin, azithromycin or ceftriaxone)",
      "Oral or IV rehydration",
      "Hospitalization for severe cases",
      "High‑calorie soft diet"
    ]).

disease_treatment(flu_influenza,
    [ "Antiviral drugs (oseltamivir) if started within 48 hours",
      "Rest, fluids, over‑the‑counter pain relievers",
      "Steam inhalation for congestion",
      "Avoid alcohol and smoking"
    ]).

disease_treatment(covid19,
    [ "Isolation to prevent spread",
      "Antipyretics for fever",
      "Oxygen therapy if needed",
      "Paxlovid (antiviral) for high‑risk patients",
      "Monitor oxygen saturation with pulse oximeter"
    ]).

disease_treatment(common_cold,
    [ "Decongestants and antihistamines",
      "Warm salt water gargle",
      "Honey and lemon tea",
      "Rest and hydration"
    ]).

disease_treatment(dengue,
    [ "Paracetamol for fever (avoid aspirin/ibuprofen)",
      "Oral rehydration",
      "Platelet monitoring",
      "Hospitalization if warning signs appear (bleeding, severe pain)"
    ]).

disease_treatment(meningitis,
    [ "Immediate hospitalization",
      "Intravenous antibiotics or antivirals",
      "Corticosteroids to reduce inflammation",
      "Fluids and oxygen support"
    ]).

disease_treatment(pneumonia,
    [ "Antibiotics (amoxicillin, azithromycin, or levofloxacin)",
      "Cough suppressants (if dry cough)",
      "Oxygen therapy if hypoxic",
      "Chest physiotherapy"
    ]).

disease_treatment(bronchitis,
    [ "Bronchodilators (inhalers) for wheezing",
      "Expectorants to loosen mucus",
      "Avoid smoke and irritants",
      "Warm fluids and rest"
    ]).

disease_treatment(strep_throat,
    [ "Antibiotics (penicillin or amoxicillin)",
      "Pain relievers (ibuprofen, paracetamol)",
      "Salt water gargles",
      "Replace toothbrush after 24 hours of antibiotics"
    ]).

disease_treatment(tuberculosis,
    [ "Standard 6‑month course of antibiotics (isoniazid, rifampicin, ethambutol, pyrazinamide)",
      "Strict adherence to treatment",
      "Isolation initially for infectious cases",
      "Nutritional support"
    ]).

disease_treatment(urinary_tract_infection,
    [ "Antibiotics (nitrofurantoin, trimethoprim‑sulfamethoxazole)",
      "Increased water intake",
      "Avoid irritants (caffeine, spicy food)",
      "Urinate frequently"
    ]).

disease_treatment(gastroenteritis,
    [ "Oral rehydration solution (ORS)",
      "Bland diet (BRAT – bananas, rice, applesauce, toast)",
      "Probiotics",
      "Avoid dairy and fatty foods"
    ]).

disease_treatment(sinusitis,
    [ "Nasal saline irrigation",
      "Decongestants or nasal corticosteroids",
      "Pain relievers",
      "Antibiotics if bacterial (amoxicillin)"
    ]).

disease_treatment(allergic_rhinitis,
    [ "Antihistamines (cetirizine, loratadine)",
      "Nasal corticosteroids (fluticasone)",
      "Avoid allergens (dust, pollen)",
      "Saline nasal rinse"
    ]).

disease_treatment(asthma,
    [ "Inhaled corticosteroids (preventive)",
      "Short‑acting beta agonists (rescue inhaler)",
      "Avoid triggers (allergens, smoke)",
      "Peak flow monitoring"
    ]).

disease_treatment(chickenpox,
    [ "Antihistamines for itching",
      "Calamine lotion",
      "Paracetamol for fever",
      "Avoid scratching to prevent scarring"
    ]).

disease_treatment(hepatitis_a,
    [ "Supportive care – rest, hydration",
      "Avoid alcohol and hepatotoxic drugs",
      "Balanced diet",
      "Most recover fully within weeks"
    ]).

disease_treatment(measles,
    [ "Vitamin A supplementation",
      "Fever management",
      "Isolation to prevent spread",
      "Hydration and rest"
    ]).

% ======================= Precautions =======================

% disease_precautions(Disease, ListOfPrecautions)

disease_precautions(malaria,
    [ "Use mosquito nets",
      "Apply insect repellent",
      "Take prophylactic medication when traveling to endemic areas",
      "Eliminate standing water"
    ]).

disease_precautions(typhoid,
    [ "Get vaccinated before travel",
      "Drink only boiled or bottled water",
      "Avoid raw fruits and vegetables",
      "Practice frequent hand washing"
    ]).

disease_precautions(flu_influenza,
    [ "Annual flu vaccine",
      "Cover mouth when coughing",
      "Wash hands frequently",
      "Avoid close contact with sick people"
    ]).

disease_precautions(covid19,
    [ "Get vaccinated and boosted",
      "Wear mask in crowded places",
      "Maintain hand hygiene",
      "Ventilate indoor spaces"
    ]).

disease_precautions(dengue,
    [ "Prevent mosquito bites (repellent, long sleeves)",
      "Remove standing water",
      "Use screens on windows",
      "Seek early medical care for fever"
    ]).

disease_precautions(tuberculosis,
    [ "BCG vaccine (for children)",
      "Avoid prolonged contact with infected individuals",
      "Ensure good ventilation",
      "Complete full course of treatment"
    ]).

disease_precautions(urinary_tract_infection,
    [ "Stay hydrated",
      "Urinate after sexual intercourse",
      "Wipe front to back",
      "Avoid holding urine"
    ]).

disease_precautions(gastroenteritis,
    [ "Wash hands before eating",
      "Consume safe water and food",
      "Rotavirus vaccine",
      "Disinfect surfaces"
    ]).

% Default precautions for other diseases can be generated but we'll trust the list above.

% ======================= Severity Levels =======================

disease_severity(malaria, severe).
disease_severity(typhoid, moderate).
disease_severity(flu_influenza, mild).
disease_severity(covid19, moderate).
disease_severity(common_cold, mild).
disease_severity(dengue, severe).
disease_severity(meningitis, severe).
disease_severity(pneumonia, severe).
disease_severity(bronchitis, moderate).
disease_severity(strep_throat, mild).
disease_severity(tuberculosis, severe).
disease_severity(urinary_tract_infection, mild).
disease_severity(gastroenteritis, mild).
disease_severity(sinusitis, mild).
disease_severity(allergic_rhinitis, mild).
disease_severity(asthma, moderate).
disease_severity(chickenpox, mild).
disease_severity(hepatitis_a, moderate).
disease_severity(measles, moderate).

% =====================================================================
% UTILITY PREDICATES
% =====================================================================

all_symptoms(Symptoms) :-
    findall(Symptom, (disease_symptoms(_, SymptomList, _), member(Symptom, SymptomList)), All),
    sort(All, Symptoms).

all_diseases(Diseases) :-
    findall(Disease, disease_symptoms(Disease, _, _), UniqueDiseases),
    sort(UniqueDiseases, Diseases).

% =====================================================================
% ENHANCED DIAGNOSIS ENGINE WITH WEIGHTED SCORING
% =====================================================================

% Scores from 0 to 100
% Uses a formula: symptom match + critical match + severity bonus (optional)
% Here we keep 70/30 ratio but can later adjust.

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
    Score0 is SymptomScore + CriticalScore,
    % Round to one decimal, then integer
    Score is round(Score0),
    Score >= 15.

diagnose(UserSymptoms, Results) :-
    all_diseases(Diseases),
    findall(Score-Disease, (member(Disease, Diseases), disease_score(Disease, UserSymptoms, Score)), AllScores),
    predsort(compare_scores, AllScores, SortedScores),
    Results = SortedScores.

compare_scores(Order, Score1-_, Score2-_) :-
    (Score1 > Score2 -> Order = (<) ;
     Score1 < Score2 -> Order = (>) ;
     Order = (=)).

% =====================================================================
% JSON OUTPUT INCLUDING TREATMENTS AND PRECAUTIONS
% =====================================================================

% Helper to get treatment list for a disease (returns empty list if none)
get_treatments(Disease, Treatments) :-
    ( disease_treatment(Disease, T) -> Treatments = T ; Treatments = [] ).

% Helper to get precautions list for a disease (returns empty list if none)
get_precautions(Disease, Precautions) :-
    ( disease_precautions(Disease, P) -> Precautions = P ; Precautions = [] ).

% Helper to get severity (string)
get_severity(Disease, SeverityStr) :-
    ( disease_severity(Disease, Severity) -> atom_string(Severity, SeverityStr) ; SeverityStr = "unknown" ).

% Enhanced JSON formatter that includes treatments, precautions, severity
format_diagnosis_json(Results, JsonTerm) :-
    findall(
        json([
            name=Disease,
            confidence=Score,
            treatments=Treatments,
            precautions=Precautions,
            severity=Severity
        ]),
        ( member(Score-Disease, Results),
          get_treatments(Disease, Treatments),
          get_precautions(Disease, Precautions),
          get_severity(Disease, Severity)
        ),
        JsonList
    ),
    JsonTerm = json([diseases=JsonList]).

% Print JSON to stdout
print_diagnosis_json(UserSymptoms) :-
    diagnose(UserSymptoms, Results),
    format_diagnosis_json(Results, JsonTerm),
    json_write(current_output, JsonTerm),
    nl.

% For backward compatibility and symptoms list
print_symptoms_json :-
    all_symptoms(Symptoms),
    json_write(current_output, Symptoms),
    nl.

% =====================================================================
% COMMAND LINE INTERFACE (unchanged except using new print_diagnosis_json)
% =====================================================================

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