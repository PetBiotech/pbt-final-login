import os
from flask import Flask, render_template, request, jsonify, redirect, url_for, make_response,send_from_directory
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import column
import re
import json
import razorpay
from razorpay.resources import payment
import secret
import simplejson as json
import json



from flask import Flask,request,render_template,redirect,url_for
from flask_admin import Admin
from flask_admin.menu import MenuLink
from flask_admin.contrib.sqla import ModelView
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_sqlalchemy import SQLAlchemy

###### for try
from flask import flash, session
######


app = Flask(__name__)

app.config['SECRET_KEY']= 'anandandkaustubh'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:Petbiotech12@pbt-website.czufb7vlwyub.ap-south-1.rds.amazonaws.com:3306/petbiotechDB'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
app.app_context().push()
login_manager = LoginManager(app)
admin = Admin(app, template_mode='bootstrap4')

#
#
#
#
# table creation
########## GLOBAL VARIABLE ################
admin_auth = False
###########################################

class testDb (db.Model):
    test_id = db.Column(db.String(10), unique=True,
                        nullable=False, primary_key=True)
    category = db.Column(db.String(30), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    requirements = db.Column(db.String(500), nullable=False)
    cost = db.Column(db.Integer, default=0, nullable=False)

    def __repr__(self):
        return '<test %r>' % self.test_id


class users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    amount = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(120), nullable=False)
    pay_id = db.Column(db.String(120), nullable=False)
    order_id = db.Column(db.String(120), nullable=False)
    status = db.Column(db.String(120), nullable=False)
    testsId = db.Column(db.String(400), nullable=False)

class Username(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True)
    password = db.Column(db.String(30))

db.create_all()

def check_user_exists(username1, password1):
    user = Username.query.filter_by(username=username1, password=password1).first()
    return True if user else False

username1 = "admin"
password1 = "admin123"

if check_user_exists(username1, password1):
    pass
else:
    tr=Username(username="admin",password="admin123")
    db.session.add(tr)
    db.session.commit()










# end of table creation

showCart = 0
arr = ""
datas = []
itemCodes = ""

# Global variables
# email=''
# name=''
# phno=''
# amount=0
# address=''
# paymentId=''
# orderId=''
# status=''

@app.route("/favicon.ico")
def favicon():
    return send_from_directory(os.path.join(app.root_path,'static'),'favicon.png',mimetype='image/favicon.png')


@app.route("/")
def home():
    global arr, showCart
    xyz = -1
    return render_template('index.html', cartArray=arr, showCart=xyz)

@app.route("/privacyPolicy")
def privacyPolicy():
    global arr, showCart
    xyz = -1
    return render_template('privacyPolicy.html', cartArray=arr, showCart=xyz)


@app.route("/tnc")
def TnC():
    global arr, showCart
    xyz = -1
    return render_template('termsAndCondition.html', cartArray=arr, showCart=xyz)


@app.route("/refundPolicy")
def refundPolicy():
    global arr, showCart
    xyz = -1
    return render_template('refundPolicy.html', cartArray=arr, showCart=xyz)


@app.route('/showCart/<int:n>/<items>', methods=['GET', 'POST'])
def showCartMenu(n, items):
    global arr, showCart, datas, itemCodes
    showCart = 0
    itemCodes=""
    
    # try:
    #     # import simplejson as json
    # except (ImportError,):
        # import json
    
    # 
    # 
    # The below line can provide error due to converting items to JSON type.
    items = json.loads(items)
    for item1 in items:
        itemCodes += item1+"***"
    i = 0
    arr = ""
    datas.clear()
    # print(datas)
    for item in items:
        try:
            # print("0")
            if (len(item) > 1):
                # print("1")
                itemData = testDb.query.filter_by(test_id=item).first()
                # print("2")
                id = str(itemData.test_id)
                category = str(itemData.category)
                name = str(itemData.name)
                requirements = str(itemData.requirements)
                cost = str(itemData.cost)
                # print("3")
                datas.append(id+"***"+category+"***"+name+"***" +
                             requirements+"***"+cost+"|||***")
                # print("4")
                i = i+1
                # showCart = 1
                #print("hello   "+arr)
        except:
            #print("alb "+"error")
            return render_template('index.html', cartArray=arr, showCart=showCart)
    # global showCart
    if (len(datas) > 0):
        showCart = 1
        for i in range(0, n):
            # print(datas[i])
            arr += datas[i]
    # return render_template('index.html',cartArray=arr,showCart=showCart)
    return redirect("/showCartOpen")


@app.route('/showCartOpen')
def showCartOpen():
    global showCart,arr
    return render_template('index.html', cartArray=arr, showCart=showCart)


@app.route("/add")
def add():
    return render_template('add.html', message="Welcome")

# @app.route("/addTest",methods=['GET','POST'])
# def addTest():
#     testid=request.form['test_id']
#     cat=request.form['category']
#     name=request.form['name']
#     req=request.form['req']
#     cost=0
#     if testid == '' or cat == '' or name == '' or req=='':
#         message="Failed"
#         return render_template('add.html',message=message)
#     try:
#         checkid=testDb.query.filter_by(test_id=request.form['test_id']).first()
#         if(checkid!=None):
#             message="Id present"
#             return render_template('add.html',message=message)
#         if request.method=='POST':
#             tests=testDb(test_id=testid,category=cat,name=name,requirements=req,cost=10)
#             db.session.add(tests)
#             db.session.commit()
#     except:
#         return render_template('error404.html')
#     return render_template('add.html',message="added")


# Payment coding starts here

@app.route('/hello', methods=['GET', 'POST'])
def hello():

    if request.method == 'POST':

        #print("hello i wonder if this statement is executed")
        hello.email = request.form.get('email')
        hello.name = request.form.get('name')
        hello.phno = request.form.get('phno')
        hello.amount = int(request.form.get('amount'))
        ad1 = request.form.get('ad1')
        ad2 = request.form.get('ad2')
        ad3 = request.form.get('ad3')
        ad4 = request.form.get('ad4')
        ad5 = request.form.get('ad5')
        hello.address = ad1+" "+ad2+" "+ad3+" "+ad4+" "+ad5

        #print("it prolly is")
        return redirect(url_for('pay'))
    return render_template('test.html')


@app.route('/pay', methods=['GET', 'POST'])
def pay():
    #global paymentId,orderId,status,amount

    client = razorpay.Client(auth=(secret.key_id, secret.key_secret))
    #print("what is happening" + str(hello.amount))
    payment = client.order.create(
        {'amount': (hello.amount * 100), 'currency': 'INR', 'payment_capture': '1'})
    # print(payment['id'])
    user_deets = {
        "name": hello.name,
        "email": hello.email,
        "phone": hello.phno
    }
    order_id=payment['id']
    return render_template('pay.html', payment=payment, details=user_deets, order_id=order_id)


@app.route('/cancel', methods=['GET', 'POST'])
def cancel():
    return render_template('index.html', cartArray=arr, showCart=showCart)


@app.route('/success', methods=['GET', 'POST'])
def success():
    global itemCodes
    if request.method == 'POST':
        #global email, name, phno, amount, address,paymentId,orderId,status
        razorpay_client = razorpay.Client(
            auth=(secret.key_id, secret.key_secret))
        # recieves payment successful response from the api
        payment_success_detail = request.form
        # storing payment_id in a variable
        payment_id = payment_success_detail['razorpay_payment_id']
        # storing detailed payment info in a variable
        payment_detail = razorpay_client.payment.fetch(payment_id)
        pay_order_id = payment_detail["order_id"]
        pay_status = payment_detail["status"]
        user = users(email=hello.email, name=hello.name, amount=hello.amount, address=hello.address,
                     phone=hello.phno, pay_id=payment_id, order_id=pay_order_id, status=pay_status, testsId=itemCodes)
        db.session.add(user)
        db.session.commit()
        # print(payment_id)
        # print(payment_detail)
        # print(pay_order_id)
    return render_template('success.html')


@app.errorhandler(404)
def pagenotfound(e):
    return render_template("error404.html")
# payment coding ends here


#####################################################
#care testing
#####################################################

@login_manager.user_loader
def load_user(user_id):
    return Username.query.get(int(user_id))

class UserAdminView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated
    column_display_pk=True
    page_size=30

admin.add_view(UserAdminView(Username, db.session,name="Users"))
admin.add_view(UserAdminView(testDb, db.session,name="Tests"))
admin.add_view(UserAdminView(users, db.session,name="Transactions"))

admin.add_link(MenuLink(name='Logout', category='', url="/logout"))

@app.route('/login', methods=['GET', 'POST'])
def login():
    
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = Username.query.filter_by(username=username, password=password).first()
        if user:
            login_user(user)
            print(current_user.is_authenticated)
            logged_in=current_user.is_authenticated
            return redirect('/admin')
    return render_template('login.html')


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect('/')

###################################################################

#####################################################
#Site map
#####################################################
@app.route('/sitemap.xml')
def sitemap():
    sitemap_xml=render_template(url_for('sitemap'))
    response=make_response(sitemap_xml)
    response.headers['Content-Type']="application/xml"

    return response
###################################################################


if __name__ == "__main__":
    
    app.run(host="localhost",port=8000,debug=True)
    
    
