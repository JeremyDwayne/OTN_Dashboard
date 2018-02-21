class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!

  def render_modal(id, partial, options)
    @id = id
    @partial = partial
    @options = options

    respond_to do |format|
      format.js { render 'application/modal' }
    end
  end

end
