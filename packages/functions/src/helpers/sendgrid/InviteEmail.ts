import Email from "@sentrei/types/models/Email";
import User from "@sentrei/types/models/User";

class InviteEmail {
  public constructor({link, name, space, sender}: Email.Invite) {
    this.link = link;
    this.name = name;
    this.space = space;
    this.sender = sender;
  }

  link: string;

  name: string;

  space: string;

  sender: string;

  public html(language: User.Language): string {
    if (language === "ja") {
      return "";
    }
    return `
    <p>Hi ${this.name}, you've been invited to join "${this.space}".</p>
    <p>${this.sender} has invited you to join the space: <strong>${this.space}</strong>.</p>
    <p>Click on the link to join now: <a href="${this.link}">${this.link}</a></p>

    <p>Thanks,</p>
    <p>Sentrei</p>
  `;
  }

  public subject(language: User.Language): string {
    if (language === "ja") {
      return "";
    }
    return `Invitation from ${this.name} at Sentrei`;
  }

  public text(language: User.Language): string {
    if (language === "ja") {
      return "";
    }
    return `
    Hi ${this.name}, you've been invited to join "${this.space}".
    ${this.sender} has invited you to join the space: ${this.space}.
    Click on the link to join now: ${this.link}

    Thanks,
    Sentrei
  `;
  }
}

export default InviteEmail;
