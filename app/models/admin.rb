class Admin < Facilitator
  has_many :consortia, foreign_key: "admin_id"

  def admin?
    type == "Admin" && role == "Admin"
  end
end
