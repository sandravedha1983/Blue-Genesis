
def predict_seaweed_growth(temp, ph, salinity):
    score = 0

    if 24 <= temp <= 30:
        score += 4
    if 7 <= ph <= 8.5:
        score += 3
    if 28 <= salinity <= 35:
        score += 3

    if score >= 8:
        return "Excellent Farming Zone"
    elif score >= 5:
        return "Moderate Zone"
    return "Poor Conditions"
