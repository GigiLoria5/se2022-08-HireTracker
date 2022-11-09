'use strict';

/* Data Access Object (DAO) module for managing hikes */

const db = require("./db");

exports.getCountries = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT DISTINCT country FROM hike`;
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(err);
            else {
                const countries = rows.map((row => ({
                    country: row.country
                })));
                resolve(countries);
            }
        });
    });
};

exports.getProvincesByCountry = (country) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT DISTINCT province FROM hike WHERE country = ?`;
        db.all(sql, [country], (err, rows) => {
            if (err)
                reject(err);
            else {
                const provinces = rows.map((row => ({
                    province: row.province
                })));
                resolve(provinces);
            }
        });
    });
};

exports.getCitiesByProvince = (province) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT DISTINCT city FROM hike WHERE province = ?`;
        db.all(sql, [province], (err, rows) => {
            if (err)
                reject(err);
            else {
                const cities = rows.map((row => ({
                    city: row.city
                })));
                resolve(cities);
            }
        });
    });
};

exports.getHikeByCity = (city) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, title, peak_altitude, province, country, description, ascent, track_length, expected_time, difficulty, start_point_type, start_point_id, end_point_type, end_point_id FROM hike WHERE city = ?`;
        db.all(sql, [city], (err, rows) => {
            if (err)
                reject(err);
            else {
                const hikes = rows.map((row => ({
                    id: row.id,
                    title: row.title, 
                    peak_altitude: row.peak_altitude,
                    city: city,
                    province: row.province,
                    country: row.country, description: row.description, ascent: row.ascent,
                    track_length: row.track_length, expected_time: row.expected_time, difficulty: row.difficulty, start_point_type: row.start_point_type, 
                    start_point_id: row.start_point_id, 
                    end_point_type: row.end_point_type,
                    end_point_id: row.end_point_id
                    
                })));
                resolve(hikes);
            }
        });
    });
};

exports.getHikeByProvince = (province) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, title, peak_altitude, city, country, description, ascent, track_length, expected_time, difficulty, start_point_type, start_point_id, end_point_type, end_point_id FROM hike WHERE province = ?`;
        db.all(sql, [province], (err, rows) => {
            if (err)
                reject(err);
            else {
                const hikes = rows.map((row => ({
                    id: row.id,
                    title: row.title, 
                    peak_altitude: row.peak_altitude,
                    city: row.city,
                    province: province,
                    country: row.country, description: row.description, ascent: row.ascent,
                    track_length: row.track_length, expected_time: row.expected_time, difficulty: row.difficulty, start_point_type: row.start_point_type, 
                    start_point_id: row.start_point_id, 
                    end_point_type: row.end_point_type,
                    end_point_id: row.end_point_id
                    
                })));
                resolve(hikes);
            }
        });
    });
};

exports.getHikeByCountry = (country) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, title, peak_altitude, province, city, description, ascent, track_length, expected_time, difficulty, start_point_type, start_point_id, end_point_type, end_point_id FROM hike WHERE country = ?`;
        db.all(sql, [country], (err, rows) => {
            if (err)
                reject(err);
            else {
                const hikes = rows.map((row => ({
                    id: row.id,
                    title: row.title, 
                    peak_altitude: row.peak_altitude,
                    city: row.city,
                    province: row.province,
                    country: country,
                    description: row.description, ascent: row.ascent,
                    track_length: row.track_length, expected_time: row.expected_time, difficulty: row.difficulty, start_point_type: row.start_point_type, 
                    start_point_id: row.start_point_id, 
                    end_point_type: row.end_point_type,
                    end_point_id: row.end_point_id
                    
                })));
                resolve(hikes);
            }
        });
    });
};

exports.getHikeByDifficulty = (difficulty) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, title, peak_altitude, province, country, description, ascent, track_length, expected_time, city, start_point_type, start_point_id, end_point_type, end_point_id FROM hike WHERE difficulty = ?`;
        db.all(sql, [difficulty], (err, rows) => {
            if (err)
                reject(err);
            else {
                const hikes = rows.map((row => ({
                    id: row.id,
                    title: row.title, 
                    peak_altitude: row.peak_altitude,
                    city: row.city,
                    province: row.province,
                    country: row.country, description: row.description, ascent: row.ascent,
                    track_length: row.track_length, expected_time: row.expected_time, difficulty: difficulty, start_point_type: row.start_point_type, 
                    start_point_id: row.start_point_id, 
                    end_point_type: row.end_point_type,
                    end_point_id: row.end_point_id
                    
                })));
                resolve(hikes);
            }
        });
    });
};

exports.getHikeByLength = (min,max) => {
    return new Promise((resolve, reject) => {
        if(min != 15.0){
            const sql = `SELECT id, title, peak_altitude, province, country, description, ascent, city, track_length, expected_time, difficulty, start_point_type, start_point_id, end_point_type, end_point_id FROM hike WHERE track_length >= ? AND track_length <= ?`;
            db.all(sql, [min, max], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    const hikes = rows.map((row => ({
                        id: row.id,
                        title: row.title, 
                        peak_altitude: row.peak_altitude,
                        city: row.city,
                        province: row.province,
                        country: row.country, description: row.description, ascent: row.ascent,
                        track_length: row.track_length,
                        expected_time: row.expected_time, 
                        difficulty: row.difficulty, 
                        start_point_type: row.start_point_type, 
                        start_point_id: row.start_point_id, 
                        end_point_type: row.end_point_type,
                        end_point_id: row.end_point_id
                        
                    })));
                    resolve(hikes);
                }
            });
        } else {
            const sql = `SELECT id, title, peak_altitude, province, country, description, ascent, city, track_length, expected_time, difficulty, start_point_type, start_point_id, end_point_type, end_point_id FROM hike WHERE track_length >= ?`;
            db.all(sql, [min], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    const hikes = rows.map((row => ({
                        id: row.id,
                        title: row.title, 
                        peak_altitude: row.peak_altitude,
                        city: row.city,
                        province: row.province,
                        country: row.country, description: row.description, ascent: row.ascent,
                        track_length: row.track_length,
                        expected_time: row.expected_time, 
                        difficulty: row.difficulty, 
                        start_point_type: row.start_point_type, 
                        start_point_id: row.start_point_id, 
                        end_point_type: row.end_point_type,
                        end_point_id: row.end_point_id
                        
                    })));
                    resolve(hikes);
                }
            });
        }
    });
};

exports.getHikeByAscent = (min,max) => {
    return new Promise((resolve, reject) => {
        if(min != 1000){
            const sql = `SELECT id, title, peak_altitude, province, country, description, city, track_length, ascent, expected_time, difficulty, start_point_type, start_point_id, end_point_type, end_point_id FROM hike WHERE ascent >= ? AND ascent <= ?`;
            db.all(sql, [min,max], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    const hikes = rows.map((row => ({
                        id: row.id,
                        title: row.title, 
                        peak_altitude: row.peak_altitude,
                        city: row.city,
                        province: row.province,
                        country: row.country, 
                        description: row.description, 
                        ascent: row.ascent,
                        track_length: row.track_length, 
                        expected_time: row.expected_time, 
                        difficulty: row.difficulty, 
                        start_point_type: row.start_point_type, 
                        start_point_id: row.start_point_id, 
                        end_point_type: row.end_point_type,
                        end_point_id: row.end_point_id
                        
                    })));
                    resolve(hikes);
                }
            });
        } else {
            const sql = `SELECT id, title, peak_altitude, province, country, description, city, track_length, ascent, expected_time, difficulty, start_point_type, start_point_id, end_point_type, end_point_id FROM hike WHERE ascent >= ?`;
            db.all(sql, [min], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    const hikes = rows.map((row => ({
                        id: row.id,
                        title: row.title, 
                        peak_altitude: row.peak_altitude,
                        city: row.city,
                        province: row.province,
                        country: row.country, 
                        description: row.description, 
                        ascent: row.ascent,
                        track_length: row.track_length, 
                        expected_time: row.expected_time, 
                        difficulty: row.difficulty, 
                        start_point_type: row.start_point_type, 
                        start_point_id: row.start_point_id, 
                        end_point_type: row.end_point_type,
                        end_point_id: row.end_point_id
                        
                    })));
                    resolve(hikes);
                }
            });
        }
    });
};

exports.getHikeByExpectedTime = (min,max) => {
    return new Promise((resolve, reject) => {
        if(min != 5.0){
            const sql = `SELECT id, title, peak_altitude, province, country, description, expected_time, ascent, track_length, city, difficulty, start_point_type, start_point_id, end_point_type, end_point_id FROM hike WHERE expected_time >= ? AND expected_time <= ?`;
            db.all(sql, [min,max], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    const hikes = rows.map((row => ({
                        id: row.id,
                        title: row.title, 
                        peak_altitude: row.peak_altitude,
                        city: row.city,
                        province: row.province,
                        country: row.country, 
                        description: row.description, 
                        ascent: row.ascent,
                        track_length: row.track_length, 
                        expected_time: row.expected_time, 
                        difficulty: row.difficulty, 
                        start_point_type: row.start_point_type, 
                        start_point_id: row.start_point_id, 
                        end_point_type: row.end_point_type,
                        end_point_id: row.end_point_id
                        
                    })));
                    resolve(hikes);
                }
            });
        } else{
            const sql = `SELECT id, title, peak_altitude, province, country, description, expected_time, ascent, track_length, city, difficulty, start_point_type, start_point_id, end_point_type, end_point_id FROM hike WHERE expected_time >= ?`;
            db.all(sql, [min], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    const hikes = rows.map((row => ({
                        id: row.id,
                        title: row.title, 
                        peak_altitude: row.peak_altitude,
                        city: row.city,
                        province: row.province,
                        country: row.country, 
                        description: row.description, 
                        ascent: row.ascent,
                        track_length: row.track_length, 
                        expected_time: row.expected_time, 
                        difficulty: row.difficulty, 
                        start_point_type: row.start_point_type, 
                        start_point_id: row.start_point_id, 
                        end_point_type: row.end_point_type,
                        end_point_id: row.end_point_id
                        
                    })));
                    resolve(hikes);
                }
            });
        }
    });
};