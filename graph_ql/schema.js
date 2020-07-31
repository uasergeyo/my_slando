const { buildSchema } = require("graphql");

var schema = buildSchema(`
    type Query {
        logInAuth(userEmail: String!,userPassword: String!):AuthData
        getAnnouncement(id:ID!):Announcement
        getAnnouncements(limit:Int,offset:Int):Announcements
        searchAnnouncements(areaId:ID,cityId:ID,categoryId:ID,subCategoryId:ID,currencyId:ID,hasPhoto:Boolean,hasDelivery:Boolean,priceFrom:Float,priceTo:Float,
            findEverywhere:Boolean,requestText:String,sort:String,limit: Int, offset: Int):Announcements
        getUser(id:ID!):User
        getAreas:[Area]
        
        getCategories:[Category]
        
        getCurrencies:[Currency]
        
        
        getPhones(userId: ID!):[Phone]
        getSubCategories(categoryId:ID!):[SubCategory]
        getPhotos(announcementId:ID!):[Photo]
        getUserPhotos(userId:ID):[Photo]
        getUserAnnouncements(userId:ID):[Announcement]
        
    }
    type Mutation {
        createAnnouncement(announcementHeader:String!, announcementText:String, announcementPrice:Float,hasDelivery:Boolean,
                           userId:ID!, areaId:ID!, cityId:ID!, currencyId:ID!, categoryId:ID!, subCategoryId:ID, photoLink:[String]):Announcement
        editAnnouncement(userId:ID!,id:ID!,announcementHeader:String, announcementText:String, announcementPrice:Float,hasDelivery:Boolean,
                         isDisabled:Boolean,currencyId:ID, categoryId:ID, subCategoryId:ID):Announcement
        createUser(userEmail: String!,userPassword: String!):User
        updateUser(userName: String,userEmail: String,userPassword: String, areaId:ID, cityId: ID,id:ID):User
        createMessage(text: String,inId: ID, outId: ID):Message
        updateMessage(id: ID, text: String, inId: ID, outId: ID):Message
        createLike(announcementId: ID!):Like
        createPhone(phone: String!, userId: ID!):[Phone]
        createPhoto(photoLink: String!, userId:ID, announcementId:ID, messageId:ID):Photo
        removeUser( id: ID!):User
        removePhone(id:ID!):[Phone]
        removePhoto(id:ID!):Photo
        setPhotoMain(id:ID!,userId:ID,announcementId:ID):[Photo]
    }

    type Announcements{
        count: Int
        rows: [Announcement]
    }

    type Announcement {
        id: ID
        announcementHeader:String
        announcementText:String
        announcementPrice:Float
        createdAt:String
        updatedAt:Int
        user:User
        area:Area
        city:City           
        currency:Currency      
        category:Category     
        subcategory:SubCategory
        photo:[Photo]
        hasDelivery:Boolean
        isDisabled:Boolean

    }

    type User {
        id: ID
        userName: String
        isDisabled: Boolean
        userInfo: String
        userDateOfBirth: String
        createdAt: Float
        city:City
        area:Area
        phones:[Phone]
        photos:[Photo]
        announcements:[Announcement]
        messages:[Message]
        favourite:[Like]
        userEmail:String
    }

    type Area{
        id: ID
        areaName: String
        cities:[City]
    }

    type Category{
        id: ID
        categoryName: String
        categoryImage: String
        subcategories:[SubCategory]
    }

    type City{
        id: ID
        cityName: String
        areaId: ID
    }

    type Currency{
        id: ID 
        currencyName: String
        currencySymbol:String
    }

    type AuthData{
        id:ID
        token:String
    }
    
    type Message{
        id: ID
        text: String
        createdAt:Int
        updatedAt:Int
        inId: ID
        outId: ID
    }

    type Like{
        id:ID
        announcement:Announcement
        userId: ID
        createdAt: String
    }
     
    type Phone{
        id:ID
        phone: String
        userId: ID
    }
    
    type Photo{
        id: ID
        photoLink: String
        createdAt: ID   
        userId:ID
        announcementId:ID
        messageId:ID
        isMain:Boolean
    }
    
    type SubCategory{
        id: ID
        subCategoryName: String
        categoryId:ID
    }
`);

module.exports = schema;

