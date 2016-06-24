import {Injectable} from '@angular/core';

export class EmailDataProvider {

  private emails: Email[];

  constructor() {
    this.emails = this.generateInitialEmails();
  }

  private generateInitialEmails() {
    let temp = [];
    temp.push(new Email(false, false, false, `stan.hudson@dundermifflin.com`, `Dinner tonight?`, `Wanna grab dinner tonight? I'm free at 7. I'm thinking tacos!`));
    temp.push(new Email(false, false, false, `ashley.peters@gmail.com`, `Mom's Birthday`, `When do you want to celebrate Mom's birthday this weekend? Sat works for us.`));
    temp.push(new Email(false, false, false, `bill.jazman@gmail.com`, `Tennis Thursday`, `Gents, The match is against Brookfield and starts at 6pm at Nicolet. Dan, Mitch and Stan are subbing this week`));
    temp.push(new Email(false, false, false, `jim.darroll@yahoo.com`, `Tennis Subs`, `I can't make it, can anyone sub for me?`));
    temp.push(new Email(false, false, false, `ryan.lindowix@gmail.com`, `Tom Delonge`, `Dude, did you hear he quit the band to search for UFOs?`));
    temp.push(new Email(false, false, false, `dave.truman@gmail.com`, `Ionic Meet-up`, `How about we shoot for July 19th for the meet-up?`));
    temp.push(new Email(false, false, false, `codeworks@codeworks.com`, `Recruiting Emails`, `Sorry, we'll remove you from our distribution list asap`));
    temp.push(new Email(false, false, false, `notifications@slickdeals.net`, `Front-Page Notification for 'Golf'`, `This front-page matches your filter for 'Golf'`));
    temp.push(new Email(false, false, false, `developer@apple.com`, `See what's next`, `The new beta of Xcode 8 is now available, and includes Swift 3 and SDK that you can use to build apps for the next version of macOS, iOS, watchOS, and tvOS.`));
    temp.push(new Email(false, false, false, `notifications@zillow.com`, `Zestimate has decreased. See details`, `The Zestimate for property 123 E. Main St has decreased to $248,715 based on recent sales in area`));
    temp.push(new Email(false, false, false, `annalyse.smith@gmail.com`, `Pics of Graham`, `Check out the little man gettin' splashy in the pool`));

    return temp;
  }

  getUnreadEmails(){
    return this.emails.filter(email => {
      return !(email.archived || email.deleted || email.snoozed );
    });
  }

  getArchivedEmails(){
    return this.emails.filter(email => {
      return email.archived;
    });
  }

  getSnoozedEmails(){
    return this.emails.filter(email => {
      return email.snoozed;
    });
  }

  deleteEmail(email:Email){
    email.deleted = true;
    email.snoozed = false;
    email.archived = false;
  }

  archiveEmail(email:Email){
    email.deleted = false;
    email.snoozed = false;
    email.archived = true;
  }

  snoozeEmail(email:Email){
    email.deleted = false;
    email.snoozed = true;
    email.archived = false;
  }
}

export class Email{
  constructor(public archived: boolean,
              public deleted: boolean,
              public snoozed: boolean,
              public sender: string,
              public subject: string,
              public body: string,
              public favored:boolean = false){
  }
}
