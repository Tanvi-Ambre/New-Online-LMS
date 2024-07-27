import json
from collections import Counter

# Load the data from the JSON file
with open('c:/Users/Tanvi Ambre/Desktop/MSc Advance Computer Science/Dissertation/New-Online-LMS/backend/fixtures/data.json', 'r') as file:
    data = json.load(file)

# Extract user IDs from the userauths.profile model
user_ids = [entry['fields']['user'] for entry in data if entry['model'] == 'userauths.profile']

# Find duplicates
duplicates = [item for item, count in Counter(user_ids).items() if count > 1]

# Print the results
if duplicates:
    print("Duplicate user values found:", duplicates)
else:
    print("No duplicates found.")
