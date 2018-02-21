class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here. For example:
    
    user ||= User.new
    if user.super_admin?
      can :manage, :all
    end
    if user.admin?
      can :manage, [Consortium, Institution, Workshop]
    end
    if user.facilitator?
      can :manage, [Institution, Workshop]
    end
    if user.faculty?
      can :read, [Workshop]
    end

  end

end
