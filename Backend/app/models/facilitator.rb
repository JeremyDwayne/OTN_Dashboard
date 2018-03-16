class Facilitator < Faculty
  belongs_to :institution
  has_many :workshops

  def facilitator?
    type == "Facilitator" && role == "Facilitator"
  end

end
