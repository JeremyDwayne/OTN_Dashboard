module ApplicationHelper

  def active_class(link_path) 
    if current_page? link_path
      "active"
    elsif request.fullpath.include? link_path
      if current_page? request.fullpath
        if link_path =~ /\/.+/
          "active"
        end
      end
    end
  end

end
