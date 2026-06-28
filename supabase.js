"use strict";

/*=========================================
        SUPABASE API
=========================================*/

async function getFeaturedMovies() {

    const { data, error } = await supabaseClient
        .from("movies")
        .select("*")
        .eq("featured", true)
        .eq("is_active", true)
        .order("featured_order");

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

async function getMovies(category) {

    const { data, error } = await supabaseClient
        .from("movies")
        .select("*")
        .eq("category", category)
        .eq("is_active", true);

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

async function getMovie(id) {

    const { data, error } = await supabaseClient
        .from("movies")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}
