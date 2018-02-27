class User < ApplicationRecord
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  before_save -> { skip_confirmation! }

  devise :omniauthable, omniauth_providers: [:facebook, :google, :twitter]

  enum role: [:Faculty, :Facilitator, :Admin, :SuperAdmin]
  after_create :set_role
  after_create :set_subclass

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
    end
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def set_role(role = "Faculty")
    self.role = role.to_s.to_sym
    self.save
  end

  def set_subclass
    if self.class.name != User::roles[self.role]
      self.becomes Object.const_get self.role
      self.type = self.role
      self.save
    end
  end

end

class SuperAdmin < Admin

  def super_admin?
    type == "SuperAdmin" && role == "SuperAdmin"
  end

end
