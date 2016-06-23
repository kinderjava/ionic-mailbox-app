import {Injectable} from '@angular/core';

export class EmailDataProvider {
  constructor() {
  }

  getEmails() {
    let temp = [];
    temp.push({
      sender: 'stanley.hudson@dundermifflin.com',
      subject: 'Dinner tonight?',
      body: 'Wanna grab dinner tonight? I\'m free at 7. I\'m thinking tacos!'
    });
    temp.push({
      sender: 'ashley.peters@gmail.com',
      subject: 'Mom\'s Birthday',
      body: 'When do you want to celebrate Mom\'s birthday this weekend? Sat works for us.'
    });
    temp.push({
      sender: 'bill.jazman@gmail.com',
      subject: 'Tennis Thursday',
      body: 'Gents, The match is against Brookfield and starts at 6pm at Nicolet. Dan, Mitch and Stan are subbing this week'
    });
    temp.push({
      sender: 'jim.darroll@yahoo.com',
      subject: 'Tennis Subs',
      body: 'I can\'t make it, can anyone sub for me?'
    });
    temp.push({
      sender: 'ryan.lindowix@gmail.com',
      subject: 'Tom Delonge',
      body: 'Dude, did you hear he quit the band to search for UFOs?'
    });
    temp.push({
      sender: 'dave.truman@gmail.com',
      subject: 'Ionic Meet-up',
      body: 'How about we shoot for July 19th for the meet-up?'
    });
    temp.push({
      sender: 'codeworks@codeworks.inc',
      subject: 'Recruiter Spam',
      body: 'Sorry, we\'ll remove you from our distribution list asap'
    });
    temp.push({
      sender: 'notifications@slickdeals.net',
      subject: 'Front-Page Notification for \'Golf\'',
      body: 'This front-page matches your filter for \'golf\''
    });
    temp.push({
      sender: 'developer@apple.com',
      subject: 'See what\'s next',
      body: `The new beta of Xcode 8 is now available, and includes Swift 3 and SDK that you can use to build apps for the next version of macOS, iOS, watchOS, and tvOS.`
    });
    temp.push({
      sender: 'notifications@zillow.com',
      subject: 'Zestimate has decreased. See details',
      body: `The zestimate for property 123 E. Main St has decreased to $248,715 based on recent sales in area`
    });
    temp.push({
      sender: 'annalyse.smith@gmail.com',
      subject: 'Pics of Graham',
      body: `Check out the little man gettin' splashy in the pool`
    });
    return temp;
  }
}
