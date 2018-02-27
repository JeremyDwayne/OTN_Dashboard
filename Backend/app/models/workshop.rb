class Workshop < ApplicationRecord
  extend FriendlyId
  friendly_id :custom_slug, use: :slugged

  belongs_to :institution
  belongs_to :facilitator
  has_many :faculty, through: :attendees
  has_many :attendees

  validates_presence_of :starts_at

  def custom_slug
    "#{name}-#{starts_at.strftime("%d-%b-%Y")}"
  end
end
