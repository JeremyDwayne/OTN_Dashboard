class Institution < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :consortium
  has_many :workshops
  has_many :facilitators
  has_many :faculty
end
