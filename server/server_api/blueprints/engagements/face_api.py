
def calculate_engagement(emotion):
    highest_pos = 0
    highest_neg = 0

    sum = 0
    total_non_zero = 0
    sum_of_neutral = 0
    sum_of_negatives = 0
    sum_of_positives = 0

    happiness = emotion['happiness']
    surprise = emotion['surprise']
    neutral = emotion['neutral']
    # mean_positive = (happiness + surprise + contempt + neutral) / 4

    sum_of_neutral += neutral
    sum_of_positives += happiness + surprise + neutral

    total_non_zero += get_count_not_zeros(
        [happiness, surprise, neutral])

    highest_pos += get_highest([happiness, surprise, neutral])

    for e in [happiness, surprise, neutral]:
        if e > 0.2:
            sum += e

    # average_non_zero_pos = sum/total_non_zero

    # print(average_non_zero_pos)
    contempt = emotion['contempt']
    anger = emotion['anger']
    disgust = emotion['disgust']
    fear = emotion['fear']
    sadness = emotion['sadness']
    sum_of_negatives += anger + disgust + fear + contempt + sadness

    # mean_negative = (anger + disgust + fear + sadness) / 4
    highest_neg += get_highest([anger, disgust, fear, sadness])
    calc = sum_of_positives / \
        max((sum_of_positives + sum_of_negatives), 1)

    # print(emotion)

    # print('sum of pos -> ' + str(sum_of_positives))
    # print('sum of neg -> ' + str(sum_of_negatives))
    # print('sum of neutral ->' + str(sum_of_neutral))
    # print(calc)
    # print(mean_positive)
    return calc


def get_highest(list):
    highest = 0
    for item in list:
        if item > highest:
            highest = item

    return highest


def get_count_not_zeros(list):
    count = 0
    for item in list:
        if item > 0.2:
            count += 1
    return count
