class Attendee < ApplicationRecord
  belongs_to :faculty
  belongs_to :workshop

  # validates_uniqueness_of :faculty_id, scope: :workshop_id
end
