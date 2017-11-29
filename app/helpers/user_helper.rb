module UserHelper

  def gravatar_for(user, size: 80)
    gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
    default_url = CGI::escape("https://i.giphy.com/media/HPC4LGvCweMrC/200_s.gif")
    gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}?s=#{size}&d=#{default_url}"
    image_tag(gravatar_url, size: 80, alt: user.name, class: "gravatar")
  end

end
