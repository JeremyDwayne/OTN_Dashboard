class Workshop < ApplicationRecord
  extend FriendlyId
  friendly_id :custom_slug, use: :slugged

  belongs_to :institution
  belongs_to :facilitator
  has_many :attendees
  has_many :faculty, through: :attendees

  def custom_slug
    "#{name}-#{starts_at.strftime("%d-%b-%Y") if !starts_at.nil?}"
  end
end
