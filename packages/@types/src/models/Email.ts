declare namespace Email {
  export interface Invite {
    link: string;
    name: string;
    space: string;
    sender: string;
  }

  export interface Update {
    editId: string;
    name: string;
  }

  export interface SendGrid {
    to: string;
    from: string;
    subject: string;
    text: string;
    html: string;
  }
}

export default Email;
