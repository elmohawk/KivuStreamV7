"use strict";

import { supabase } from "./supabase.js";

/*=========================================
        GET FEATURED MOVIES
=========================================*/

export async function getFeaturedMovies() {

    const { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("featured", true)
        .eq("is_active", true)
        .order("featured_order", { ascending: true });

    if (error) {
        console.error("Supabase:", error.message);
        return [];
    }

    return data;

}

/*=========================================
        GET MOVIES BY CATEGORY
=========================================*/

export async function getMovies(category) {

    const { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("category", category)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Supabase:", error.message);
        return [];
    }

    return data;

}

/*=========================================
        GET SINGLE MOVIE
=========================================*/

export async function getMovie(id) {

    const { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Supabase:", error.message);
        return null;
    }

    return data;

}

/*=========================================
        SEARCH MOVIES
=========================================*/

export async function searchMovies(keyword) {

    const { data, error } = await supabase
        .from("movies")
        .select("*")
        .ilike("title", `%${keyword}%`)
        .eq("is_active", true);

    if (error) {
        console.error("Supabase:", error.message);
        return [];
    }

    return data;

}
