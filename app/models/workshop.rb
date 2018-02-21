class Workshop < ApplicationRecord
  belongs_to :institution
  belongs_to :facilitator
  has_many :faculty, through: :attendees
  has_many :attendees

end
