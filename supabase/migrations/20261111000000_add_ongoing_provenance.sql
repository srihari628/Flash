-- Allow 'ongoing' provenance status for active studio engagements (e.g., Vyomi Fitness Club)
ALTER TYPE provenance_type ADD VALUE IF NOT EXISTS 'ongoing';

