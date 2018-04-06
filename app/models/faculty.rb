class Faculty < User
  belongs_to :institution, optional: true
  has_many :attendees
  has_many :workshops, through: :attendees

  def faculty?
    type == "Faculty" && role == "Faculty"
  end

end

