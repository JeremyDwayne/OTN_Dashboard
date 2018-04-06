class Facilitator < Faculty
  belongs_to :institution, optional: true
  has_many :workshops

  def facilitator?
    type == "Facilitator" && role == "Facilitator"
  end

end
