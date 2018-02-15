class Workshop < ApplicationRecord
  belongs_to :institution
  has_one :facilitator, class_name: "User"
  has_many :attendees, class_name: "User"
end
