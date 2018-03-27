class InstitutionSerializer
  include FastJsonapi::ObjectSerializer

  attributes :name, :address_line_1, :address_line_2, :city, :state, :zip, :consortium_id, :slug, :created_at, :updated_at

  belongs_to :consortium, serializer: :consortium
  has_many :workshops, serializer: :workshop
  has_many :facilitators, serializer: :facilitator
  has_many :faculty, serializer: :faculty
end
