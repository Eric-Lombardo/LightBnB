

-- SELECT properties.id,
--   title, 
--   cost_per_night, 
--   start_date, 
--   (SELECT avg(rating) AS average_rating FROM property_reviews JOIN properties ON properties.id = property_reviews.property_id)
-- FROM property_reviews
--   JOIN properties ON properties.id = property_reviews.property_id
--   JOIN reservations ON property_reviews.reservation_id = reservations.id
--   JOIN users ON property_reviews.guest_id = users.id
-- WHERE users.id = 1
-- GROUP BY properties.id, title, cost_per_night, start_date
-- ORDER BY start_date;


-- -- display average rating true
-- SELECT avg(rating) AS average_rating
-- FROM property_reviews
--   JOIN properties ON properties.id = property_reviews.property_id
-- WHERE properties.title = 'Apple barn';

SELECT properties.id, title, cost_per_night, start_date, avg(rating) as average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id 
WHERE reservations.guest_id = 1
AND reservations.end_date < now()::date
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT 10;