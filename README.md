# feedbackapp
School Shaped d+b 1 cycle - feedback app

http://aloverso.github.io/feedbackapp/

## Dependencies
If you edit the Sass file `main.scss`, be sure to update the linked CSS sheet by running:
```
sass main.scss main.css
```

You will have to have Sass installed, and to install Sass you must have Ruby installed.
To install Ruby:
```
sudo apt-get install ruby
```
Then to install Sass:
```
sudo su -c "gem install sass"
```

## Components (focus on mocking these capabilities)
* Ability to upload audio/video/text, focusing on video in this prototype
* Ability to flag/annotate sections of media
  * Requires ability to playback media
  * Some kind of persistent flagging mechanism
* Associate teacher comments with sections of media
* Ability to share sections of annotated media 
  * via email? In app?
* Do teachers need to log in?  Can they just use the app without login?
* How to deal with security/confidentiality?
* What if we have teachers log in, and they can share a special sharing link with administrators/other teachers - equivalent of google drive “can view”

##Implementation Things
* Allow the teacher to pause the video, click a button, and add a flag
* Flag can include a category (“doing well”) or (“needs feedback”) and add comments to explain what they’re looking for
* When they’re done, the site has a marked-up video that gets shared to admins
* Admins can watch the whole video through if they choose, or just skip to flagged sections


