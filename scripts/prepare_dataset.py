import pandas as pd
import json
import os

def prepare_dataset():
    print("Loading datasets...")
    # Load Exercise Dataset
    exercises_df = pd.read_csv('megaGymDataset.csv')
    
    # Load User Tracking Dataset
    tracking_df = pd.read_csv('gym_members_exercise_tracking.csv')

    dataset = []

    print("Generating training samples from tracking data...")
    for _, row in tracking_df.head(500).iterrows():
        age = row['Age']
        gender = row['Gender']
        weight = row['Weight (kg)']
        workout_type = row['Workout_Type']
        duration = row['Session_Duration (hours)']
        calories = row['Calories_Burned']
        water = row['Water_Intake (liters)']
        bpm = row['Avg_BPM']

        prompt = f"I am a {age}-year-old {gender}, weighing {weight} kg. I want to do a {workout_type} workout. What should my session look like?"
        response = f"Based on similar profiles, a typical {workout_type} session for you would last about {duration} hours and burn approximately {calories} calories. Aim for an average BPM of {bpm}. Don't forget to hydrate with around {water} liters of water throughout the day."
        
        dataset.append({
            "instruction": prompt,
            "response": response
        })

    print("Generating training samples from exercise data...")
    for _, row in exercises_df.head(500).iterrows():
        name = row['Title']
        muscle = row['BodyPart']
        equipment = row['Equipment']
        desc = row['Desc']
        
        prompt = f"How do I perform the {name}?"
        response = f"The {name} is an exercise targeting the {muscle}. Equipment needed: {equipment}. Instructions: {desc}"
        
        dataset.append({
            "instruction": prompt,
            "response": response
        })

    # Save to JSONL
    output_path = 'dataset.jsonl'
    print(f"Saving {len(dataset)} samples to {output_path}...")
    with open(output_path, 'w', encoding='utf-8') as f:
        for item in dataset:
            f.write(json.dumps(item) + '\n')
            
    print("Dataset preparation complete!")

if __name__ == "__main__":
    prepare_dataset()
