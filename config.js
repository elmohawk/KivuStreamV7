"use strict";

/*=========================================
        KIVUSTREAM CONFIG
=========================================*/

const SUPABASE_URL = "https://exjgejujfxejjlbfizgz.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4amdlanVqZnhlampsYmZpemd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MTQzMTQsImV4cCI6MjA5NDA5MDMxNH0.CWUYLk4qJfriIYXWScB7wcHHVTCuz0SGDhWUV3tMR1Y";

const TMDB_API_KEY = "8b8937bf3e114fa3502358a4f090c0df";

const TMDB_IMAGE = "https://image.tmdb.org/t/p/original";
const WORKER_URL = "https://kivustream.mrhawk2007.workers.dev";
const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
