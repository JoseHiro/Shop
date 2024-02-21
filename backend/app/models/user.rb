class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :timeoutable, :registerable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self
  #  :recoverable, :rememberable,
  #  def self.find_for_database_authentication(warden_conditions)
  #   conditions = warden_conditions.dup
  #   email = conditions.delete(:email)
  #   where(conditions.to_h).where(["lower(email) = :value", { :value => email.downcase }]).first
  # end
  has_many :products
end
