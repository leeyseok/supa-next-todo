Read all rows
curl 'https://evhxzetvxotckpxdkmnj.supabase.co/rest/v1/todos_no_rls?select=*' \
-H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2aHh6ZXR2eG90Y2tweGRrbW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzMDEyOTYsImV4cCI6MjAzNzg3NzI5Nn0.vOaeXEC-UPArDQ9Ipuj00yQORDMMNZdlElY_kGEjto8"

npx supabase gen types typescript --project-id '${projectId}' --schema public > types/supabase.ts
