-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT TO anon
  WITH CHECK (true);

-- Create policy to allow reads for authenticated users only
CREATE POLICY "Allow authenticated reads" ON contacts
  FOR SELECT TO authenticated
  USING (true);
