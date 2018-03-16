class WorkshopSerializer
  include FastJsonapi::ObjectSerializer

  attributes :name, :description, :institution_id, :additional_location_info, :starts_at, :duration, :stipend_cents, :stipend_currency, :sign_up_deadline, :attendee_limit, :review_deadline, :facilitator_id, :created_at, :updated_at, :slug

  belongs_to :institution, serializer: :institution
  belongs_to :facilitator, serializer: :facilitator
  has_many :attendees
  has_many :faculty, through: :attendees, serializer: :faculty, record_type: :attendee
end
