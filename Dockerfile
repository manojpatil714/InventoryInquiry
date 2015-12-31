FROM centos

RUN yum update -y

# Enable Extra Packages for Enterprise Linux (EPEL) for CentOS
RUN     yum install -y epel-release
# Install Node.js and npm
RUN     yum install -y nodejs npm

# Bundle app source
COPY . /
RUN cd /InventoryInquiry/InventoryDomainService; npm install
RUN cd /InventoryInquiry/InventoryIntegrationService; npm install
RUN cd /InventoryInquiry/InventoryIntegrationService; npm install revalidator   

EXPOSE  3003
EXPOSE  3004

ADD start.sh /
ADD integrationservice.sh /
ADD domainservice.sh /

CMD ["/bin/sh","start.sh"]
