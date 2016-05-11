class ActionCorreo < ActionMailer::Base
    # default from: 'xstylevisualx@gmail.com'
    def contacto_email(persona)
        @user = persona
        mail(from: "<cavinsa_comentarios@outlook.com>", to: "<cavinsa_comentarios@outlook.com>", subject:@user[:nombre] )
    end
end
