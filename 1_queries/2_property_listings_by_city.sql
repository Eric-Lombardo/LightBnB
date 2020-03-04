SELECT properties.id, 
  properties.title, 
  cost_per_night,
  AVG(rating) AS average_rating
FROM properties
  JOIN property_reviews ON property_reviews.property_id = properties.id
WHERE city = 'North Vancouver' OR city = 'Vancouver'
GROUP BY properties.id
HAVING AVG(rating) >= 4
ORDER BY cost_per_night;