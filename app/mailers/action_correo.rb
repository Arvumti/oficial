class ActionCorreo < ActionMailer::Base
    # default from: 'xstylevisualx@gmail.com'
    def contacto_email(persona)
        @user = persona
        mail(from: persona[:email], to: "<comentariosrealia@outlook.com>", subject:@user[:nombre] )
    end
end
