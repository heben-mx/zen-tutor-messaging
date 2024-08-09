sudo su
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 22
yum update -y
yum install git -y
git clone https://github.com/heben-mx/zen-tutor-messaging.git
cd zen-tutor-messaging
npm install pm2 -g
npm i && npm start
