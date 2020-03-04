-- data for users
INSERT INTO users (name, email, password) VALUES ('eric', '1@1.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('bob', '2@2.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('cass', '3@3.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('mary', '4@4.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- data for properties
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, country, street, city, province, post_code)
VALUES (1, 'house1', 'description', 'http://placekitten.com/200/300', 'http://placekitten.com/200/300', 'canada', 'street1', 'mtl', 'qc', 'h1e6e3');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, country, street, city, province, post_code)
VALUES (2, 'house2', 'description', 'http://placekitten.com/200/300', 'http://placekitten.com/200/300', 'canada', 'street2', 'mtl', 'qc', 'h2e6e3');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, country, street, city, province, post_code)
VALUES (3, 'house3', 'description', 'http://placekitten.com/200/300', 'http://placekitten.com/200/300', 'canada', 'street3', 'mtl', 'qc', 'h3e6e3');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, country, street, city, province, post_code)
VALUES (4, 'house4', 'description', 'http://placekitten.com/200/300', 'http://placekitten.com/200/300', 'canada', 'street4', 'mtl', 'qc', 'h4e6e3');

-- data for reservations
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES (2020-01-01, 2020-01-02, 1, 1);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES (2020-02-02, 2020-02-03, 2, 2);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES (2020-03-03, 2020-03-04, 3, 3);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES (2020-04-04, 2020-04-05, 4, 4);

-- data for property_reviews
INSERT INTO property_reviews (guest_id, property_id, reservation_id, message) VALUES (1, 1, 1, 'message');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, message) VALUES (2, 2, 2, 'message');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, message) VALUES (3, 3, 3, 'message');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, message) VALUES (4, 4, 4, 'message');