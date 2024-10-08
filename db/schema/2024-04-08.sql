PGDMP     3    	                |         
   memorialdb    15.4    15.4 K    v           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            w           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            x           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            y           1262    93717 
   memorialdb    DATABASE     �   CREATE DATABASE memorialdb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE memorialdb;
                postgres    false                        2615    93919    dbo    SCHEMA        CREATE SCHEMA dbo;
    DROP SCHEMA dbo;
                postgres    false            �            1255    93921    usp_reset() 	   PROCEDURE     �  CREATE PROCEDURE dbo.usp_reset()
    LANGUAGE plpgsql
    AS $_$
begin

	DELETE FROM dbo."Burial";
	DELETE FROM dbo."WorkOrder";
	DELETE FROM dbo."Reservation";
	DELETE FROM dbo."Notifications";
	DELETE FROM dbo."GatewayConnectedUsers";
	DELETE FROM dbo."Notifications";
	DELETE FROM dbo."UserProfilePic";
	DELETE FROM dbo."Files";
	DELETE FROM dbo."Users";
	DELETE FROM dbo."Access";
	
	ALTER SEQUENCE dbo."Burial_BurialId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."WorkOrder_WorkOrderId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."Reservation_ReservationId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."Notifications_NotificationId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."GatewayConnectedUsers_Id_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."Notifications_NotificationId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."Users_UserId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."Access_AccessId_seq" RESTART WITH 1;
	ALTER SEQUENCE dbo."Files_FileId_seq" RESTART WITH 1;
	UPDATE dbo."Lot"
	SET "Status"='AVAILABLE';
	
	
	INSERT INTO dbo."Access" (
		"AccessCode",
		"Name", 
		"Active",
		"AccessPages"
	)
	VALUES (
			'000001',
			'Admin',
			true,
			'[
      {
        "page": "Map",
        "view": true,
        "modify": true,
        "rights": []
      },
      {
        "page": "Burial",
        "view": true,
        "modify": true,
        "rights": ["Status"]
      },
      {
        "page": "Reservation",
        "view": true,
        "modify": true,
        "rights": ["Approval"]
      },
      {
        "page": "Work Order",
        "view": true,
        "modify": true,
        "rights": ["Status"]
      },
      {
        "page": "Users",
        "view": true,
        "modify": true,
        "rights": []
      },
      {
        "page": "Access",
        "view": true,
        "modify": true,
        "rights": []
      }
    ]');
	
	INSERT INTO dbo."Users" (
		"UserCode",
		"UserName",
		"Password", 
		"FullName",
		"Gender",
		"BirthDate",
		"MobileNumber",
		"AccessGranted",
		"AccessId",
		"UserType")
	VALUES (
			'000001',
			'admin',
			'$2b$10$LqN3kzfgaYnP5PfDZFfT4edUFqh5Lu7amIxeDDDmu/KEqQFze.p8a',  
			'Admin Admin',
			'GENDER',
			'1998-07-18',
			'123456',
			true,
			1,
			'ADMIN');
	
END;
$_$;
     DROP PROCEDURE dbo.usp_reset();
       dbo          postgres    false    6            �            1259    93922    Access    TABLE     �   CREATE TABLE dbo."Access" (
    "AccessId" bigint NOT NULL,
    "Name" character varying NOT NULL,
    "AccessPages" json DEFAULT '[]'::json NOT NULL,
    "Active" boolean DEFAULT true NOT NULL,
    "AccessCode" character varying
);
    DROP TABLE dbo."Access";
       dbo         heap    postgres    false    6            �            1259    93929    Access_AccessId_seq    SEQUENCE     �   ALTER TABLE dbo."Access" ALTER COLUMN "AccessId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Access_AccessId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    6    215            �            1259    94224    Burial    TABLE       CREATE TABLE dbo."Burial" (
    "BurialId" bigint NOT NULL,
    "BurialCode" character varying,
    "FullName" character varying NOT NULL,
    "DateOfBirth" date NOT NULL,
    "DateOfDeath" date NOT NULL,
    "DateOfBurial" date NOT NULL,
    "FamilyContactPerson" character varying NOT NULL,
    "FamilyContactNumber" character varying NOT NULL,
    "FromReservation" boolean DEFAULT false NOT NULL,
    "ReservationId" bigint,
    "LotId" bigint NOT NULL,
    "Active" boolean DEFAULT true NOT NULL,
    "WorkOrderId" bigint NOT NULL
);
    DROP TABLE dbo."Burial";
       dbo         heap    postgres    false    6            �            1259    94223    Burial_BurialId_seq    SEQUENCE     �   ALTER TABLE dbo."Burial" ALTER COLUMN "BurialId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Burial_BurialId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    232    6            �            1259    93944    Files    TABLE     i   CREATE TABLE dbo."Files" (
    "FileId" bigint NOT NULL,
    "FileName" text NOT NULL,
    "Url" text
);
    DROP TABLE dbo."Files";
       dbo         heap    postgres    false    6            �            1259    93949    Files_FileId_seq    SEQUENCE     �   ALTER TABLE dbo."Files" ALTER COLUMN "FileId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Files_FileId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    217    6            �            1259    93950    GatewayConnectedUsers    TABLE     �   CREATE TABLE dbo."GatewayConnectedUsers" (
    "Id" bigint NOT NULL,
    "SocketId" character varying(100) NOT NULL,
    "UserId" bigint NOT NULL
);
 (   DROP TABLE dbo."GatewayConnectedUsers";
       dbo         heap    postgres    false    6            �            1259    93953    GatewayConnectedUsers_Id_seq    SEQUENCE     �   ALTER TABLE dbo."GatewayConnectedUsers" ALTER COLUMN "Id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."GatewayConnectedUsers_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    6    219            �            1259    94152    Lot    TABLE     #  CREATE TABLE dbo."Lot" (
    "LotId" bigint NOT NULL,
    "LotCode" character varying NOT NULL,
    "Block" character varying NOT NULL,
    "Level" bigint NOT NULL,
    "MapData" json DEFAULT '{}'::json NOT NULL,
    "Status" character varying DEFAULT 'EMPTY'::character varying NOT NULL
);
    DROP TABLE dbo."Lot";
       dbo         heap    postgres    false    6            �            1259    94151    Lot_LotId_seq    SEQUENCE     �   ALTER TABLE dbo."Lot" ALTER COLUMN "LotId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Lot_LotId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    228    6            �            1259    93954    Notifications    TABLE     �  CREATE TABLE dbo."Notifications" (
    "NotificationId" bigint NOT NULL,
    "Title" character varying NOT NULL,
    "Description" character varying NOT NULL,
    "Type" character varying NOT NULL,
    "ReferenceId" character varying NOT NULL,
    "IsRead" boolean DEFAULT false NOT NULL,
    "UserId" bigint NOT NULL,
    "Date" timestamp with time zone DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL
);
     DROP TABLE dbo."Notifications";
       dbo         heap    postgres    false    6            �            1259    93961     Notifications_NotificationId_seq    SEQUENCE     �   ALTER TABLE dbo."Notifications" ALTER COLUMN "NotificationId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Notifications_NotificationId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    6    221            �            1259    94195    Reservation    TABLE     U  CREATE TABLE dbo."Reservation" (
    "ReservationId" bigint NOT NULL,
    "ReservationCode" character varying,
    "UserId" bigint NOT NULL,
    "LotId" bigint NOT NULL,
    "DateTime" timestamp with time zone NOT NULL,
    "BurialName" character varying NOT NULL,
    "DateOfBirth" date NOT NULL,
    "DateOfDeath" date NOT NULL,
    "DateOfBurial" date NOT NULL,
    "FamilyContactPerson" character varying NOT NULL,
    "FamilyContactNumber" character varying NOT NULL,
    "Status" character varying DEFAULT 'PENDING'::character varying NOT NULL,
    "Active" boolean DEFAULT true NOT NULL
);
    DROP TABLE dbo."Reservation";
       dbo         heap    postgres    false    6            �            1259    94194    Reservation_ReservationId_seq    SEQUENCE     �   ALTER TABLE dbo."Reservation" ALTER COLUMN "ReservationId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Reservation_ReservationId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    6    230            �            1259    94000    SystemConfig    TABLE     r   CREATE TABLE dbo."SystemConfig" (
    "Key" character varying NOT NULL,
    "Value" character varying NOT NULL
);
    DROP TABLE dbo."SystemConfig";
       dbo         heap    postgres    false    6            �            1259    94282    UserOneSignalSubscription    TABLE     �   CREATE TABLE dbo."UserOneSignalSubscription" (
    "UserId" bigint NOT NULL,
    "SubscriptionID" character varying NOT NULL
);
 ,   DROP TABLE dbo."UserOneSignalSubscription";
       dbo         heap    postgres    false    6            �            1259    94027    UserProfilePic    TABLE     b   CREATE TABLE dbo."UserProfilePic" (
    "UserId" bigint NOT NULL,
    "FileId" bigint NOT NULL
);
 !   DROP TABLE dbo."UserProfilePic";
       dbo         heap    postgres    false    6            �            1259    94030    Users    TABLE     W  CREATE TABLE dbo."Users" (
    "UserId" bigint NOT NULL,
    "UserName" character varying NOT NULL,
    "Password" character varying NOT NULL,
    "FullName" character varying NOT NULL,
    "Gender" character varying DEFAULT 'Others'::character varying NOT NULL,
    "BirthDate" date NOT NULL,
    "MobileNumber" character varying NOT NULL,
    "AccessGranted" boolean NOT NULL,
    "AccessId" bigint,
    "Active" boolean DEFAULT true NOT NULL,
    "UserCode" character varying,
    "Address" character varying DEFAULT 'NA'::character varying NOT NULL,
    "UserType" character varying NOT NULL
);
    DROP TABLE dbo."Users";
       dbo         heap    postgres    false    6            �            1259    94038    Users_UserId_seq    SEQUENCE     �   ALTER TABLE dbo."Users" ALTER COLUMN "UserId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Users_UserId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    6    225            �            1259    94322 	   WorkOrder    TABLE     �  CREATE TABLE dbo."WorkOrder" (
    "WorkOrderId" bigint NOT NULL,
    "WorkOrderCode" character varying,
    "AssignedStaffUserId" bigint NOT NULL,
    "DateTargetCompletion" date NOT NULL,
    "Title" character varying NOT NULL,
    "Description" character varying NOT NULL,
    "Status" character varying DEFAULT 'PENDING'::character varying NOT NULL,
    "Active" boolean DEFAULT true NOT NULL
);
    DROP TABLE dbo."WorkOrder";
       dbo         heap    postgres    false    6            �            1259    94321    WorkOrder_WorkOrderId_seq    SEQUENCE     �   ALTER TABLE dbo."WorkOrder" ALTER COLUMN "WorkOrderId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."WorkOrder_WorkOrderId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    6    235            _          0    93922    Access 
   TABLE DATA           Z   COPY dbo."Access" ("AccessId", "Name", "AccessPages", "Active", "AccessCode") FROM stdin;
    dbo          postgres    false    215   k       p          0    94224    Burial 
   TABLE DATA           �   COPY dbo."Burial" ("BurialId", "BurialCode", "FullName", "DateOfBirth", "DateOfDeath", "DateOfBurial", "FamilyContactPerson", "FamilyContactNumber", "FromReservation", "ReservationId", "LotId", "Active", "WorkOrderId") FROM stdin;
    dbo          postgres    false    232   �k       a          0    93944    Files 
   TABLE DATA           ;   COPY dbo."Files" ("FileId", "FileName", "Url") FROM stdin;
    dbo          postgres    false    217   �k       c          0    93950    GatewayConnectedUsers 
   TABLE DATA           J   COPY dbo."GatewayConnectedUsers" ("Id", "SocketId", "UserId") FROM stdin;
    dbo          postgres    false    219   l       l          0    94152    Lot 
   TABLE DATA           W   COPY dbo."Lot" ("LotId", "LotCode", "Block", "Level", "MapData", "Status") FROM stdin;
    dbo          postgres    false    228   *l       e          0    93954    Notifications 
   TABLE DATA           �   COPY dbo."Notifications" ("NotificationId", "Title", "Description", "Type", "ReferenceId", "IsRead", "UserId", "Date") FROM stdin;
    dbo          postgres    false    221   �       n          0    94195    Reservation 
   TABLE DATA           �   COPY dbo."Reservation" ("ReservationId", "ReservationCode", "UserId", "LotId", "DateTime", "BurialName", "DateOfBirth", "DateOfDeath", "DateOfBurial", "FamilyContactPerson", "FamilyContactNumber", "Status", "Active") FROM stdin;
    dbo          postgres    false    230   �       g          0    94000    SystemConfig 
   TABLE DATA           5   COPY dbo."SystemConfig" ("Key", "Value") FROM stdin;
    dbo          postgres    false    223   +�       q          0    94282    UserOneSignalSubscription 
   TABLE DATA           N   COPY dbo."UserOneSignalSubscription" ("UserId", "SubscriptionID") FROM stdin;
    dbo          postgres    false    233   H�       h          0    94027    UserProfilePic 
   TABLE DATA           ;   COPY dbo."UserProfilePic" ("UserId", "FileId") FROM stdin;
    dbo          postgres    false    224   e�       i          0    94030    Users 
   TABLE DATA           �   COPY dbo."Users" ("UserId", "UserName", "Password", "FullName", "Gender", "BirthDate", "MobileNumber", "AccessGranted", "AccessId", "Active", "UserCode", "Address", "UserType") FROM stdin;
    dbo          postgres    false    225   ��       s          0    94322 	   WorkOrder 
   TABLE DATA           �   COPY dbo."WorkOrder" ("WorkOrderId", "WorkOrderCode", "AssignedStaffUserId", "DateTargetCompletion", "Title", "Description", "Status", "Active") FROM stdin;
    dbo          postgres    false    235   �       z           0    0    Access_AccessId_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('dbo."Access_AccessId_seq"', 1, true);
          dbo          postgres    false    216            {           0    0    Burial_BurialId_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('dbo."Burial_BurialId_seq"', 1, false);
          dbo          postgres    false    231            |           0    0    Files_FileId_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('dbo."Files_FileId_seq"', 1, false);
          dbo          postgres    false    218            }           0    0    GatewayConnectedUsers_Id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('dbo."GatewayConnectedUsers_Id_seq"', 1, false);
          dbo          postgres    false    220            ~           0    0    Lot_LotId_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('dbo."Lot_LotId_seq"', 1183, true);
          dbo          postgres    false    227                       0    0     Notifications_NotificationId_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('dbo."Notifications_NotificationId_seq"', 1, false);
          dbo          postgres    false    222            �           0    0    Reservation_ReservationId_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('dbo."Reservation_ReservationId_seq"', 1, false);
          dbo          postgres    false    229            �           0    0    Users_UserId_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('dbo."Users_UserId_seq"', 1, true);
          dbo          postgres    false    226            �           0    0    WorkOrder_WorkOrderId_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('dbo."WorkOrder_WorkOrderId_seq"', 1, false);
          dbo          postgres    false    234            �           2606    94040    Access Access_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY dbo."Access"
    ADD CONSTRAINT "Access_pkey" PRIMARY KEY ("AccessId");
 =   ALTER TABLE ONLY dbo."Access" DROP CONSTRAINT "Access_pkey";
       dbo            postgres    false    215            �           2606    94232    Burial Burial_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY dbo."Burial"
    ADD CONSTRAINT "Burial_pkey" PRIMARY KEY ("BurialId");
 =   ALTER TABLE ONLY dbo."Burial" DROP CONSTRAINT "Burial_pkey";
       dbo            postgres    false    232            �           2606    94160    Lot Lot_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY dbo."Lot"
    ADD CONSTRAINT "Lot_pkey" PRIMARY KEY ("LotId");
 7   ALTER TABLE ONLY dbo."Lot" DROP CONSTRAINT "Lot_pkey";
       dbo            postgres    false    228            �           2606    94044     Notifications Notifications_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY dbo."Notifications"
    ADD CONSTRAINT "Notifications_pkey" PRIMARY KEY ("NotificationId");
 K   ALTER TABLE ONLY dbo."Notifications" DROP CONSTRAINT "Notifications_pkey";
       dbo            postgres    false    221            �           2606    94222    Reservation Reservation_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY dbo."Reservation"
    ADD CONSTRAINT "Reservation_pkey" PRIMARY KEY ("ReservationId");
 G   ALTER TABLE ONLY dbo."Reservation" DROP CONSTRAINT "Reservation_pkey";
       dbo            postgres    false    230            �           2606    94054    SystemConfig SystemConfig_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY dbo."SystemConfig"
    ADD CONSTRAINT "SystemConfig_pkey" PRIMARY KEY ("Key");
 I   ALTER TABLE ONLY dbo."SystemConfig" DROP CONSTRAINT "SystemConfig_pkey";
       dbo            postgres    false    223            �           2606    94288 8   UserOneSignalSubscription UserOneSignalSubscription_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY dbo."UserOneSignalSubscription"
    ADD CONSTRAINT "UserOneSignalSubscription_pkey" PRIMARY KEY ("UserId", "SubscriptionID");
 c   ALTER TABLE ONLY dbo."UserOneSignalSubscription" DROP CONSTRAINT "UserOneSignalSubscription_pkey";
       dbo            postgres    false    233    233            �           2606    94330    WorkOrder WorkOrder_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY dbo."WorkOrder"
    ADD CONSTRAINT "WorkOrder_pkey" PRIMARY KEY ("WorkOrderId");
 C   ALTER TABLE ONLY dbo."WorkOrder" DROP CONSTRAINT "WorkOrder_pkey";
       dbo            postgres    false    235            �           2606    94058    Files pk_files_901578250 
   CONSTRAINT     [   ALTER TABLE ONLY dbo."Files"
    ADD CONSTRAINT pk_files_901578250 PRIMARY KEY ("FileId");
 A   ALTER TABLE ONLY dbo."Files" DROP CONSTRAINT pk_files_901578250;
       dbo            postgres    false    217            �           2606    94060 8   GatewayConnectedUsers pk_gatewayconnectedusers_933578364 
   CONSTRAINT     w   ALTER TABLE ONLY dbo."GatewayConnectedUsers"
    ADD CONSTRAINT pk_gatewayconnectedusers_933578364 PRIMARY KEY ("Id");
 a   ALTER TABLE ONLY dbo."GatewayConnectedUsers" DROP CONSTRAINT pk_gatewayconnectedusers_933578364;
       dbo            postgres    false    219            �           2606    94062 -   UserProfilePic pk_userprofilepic_1_1525580473 
   CONSTRAINT     p   ALTER TABLE ONLY dbo."UserProfilePic"
    ADD CONSTRAINT pk_userprofilepic_1_1525580473 PRIMARY KEY ("UserId");
 V   ALTER TABLE ONLY dbo."UserProfilePic" DROP CONSTRAINT pk_userprofilepic_1_1525580473;
       dbo            postgres    false    224            �           2606    94064    Users pk_users_1557580587 
   CONSTRAINT     \   ALTER TABLE ONLY dbo."Users"
    ADD CONSTRAINT pk_users_1557580587 PRIMARY KEY ("UserId");
 B   ALTER TABLE ONLY dbo."Users" DROP CONSTRAINT pk_users_1557580587;
       dbo            postgres    false    225            �           1259    94161    Lot_LotCode_idx    INDEX     m   CREATE UNIQUE INDEX "Lot_LotCode_idx" ON dbo."Lot" USING btree ("LotCode") WITH (deduplicate_items='false');
 "   DROP INDEX dbo."Lot_LotCode_idx";
       dbo            postgres    false    228            �           1259    94068    u_user_number    INDEX     �   CREATE UNIQUE INDEX u_user_number ON dbo."Users" USING btree ("MobileNumber", "Active") WITH (deduplicate_items='false') WHERE ("Active" = true);
    DROP INDEX dbo.u_user_number;
       dbo            postgres    false    225    225    225            �           1259    94069 
   u_username    INDEX     �   CREATE UNIQUE INDEX u_username ON dbo."Users" USING btree ("UserName", "Active") WITH (deduplicate_items='false') WHERE ("Active" = true);
    DROP INDEX dbo.u_username;
       dbo            postgres    false    225    225    225            �           2606    94238    Burial fk_Burial_Lot    FK CONSTRAINT     v   ALTER TABLE ONLY dbo."Burial"
    ADD CONSTRAINT "fk_Burial_Lot" FOREIGN KEY ("LotId") REFERENCES dbo."Lot"("LotId");
 ?   ALTER TABLE ONLY dbo."Burial" DROP CONSTRAINT "fk_Burial_Lot";
       dbo          postgres    false    228    232    3260            �           2606    94233    Burial fk_Burial_Reservation    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Burial"
    ADD CONSTRAINT "fk_Burial_Reservation" FOREIGN KEY ("ReservationId") REFERENCES dbo."Reservation"("ReservationId");
 G   ALTER TABLE ONLY dbo."Burial" DROP CONSTRAINT "fk_Burial_Reservation";
       dbo          postgres    false    3262    230    232            �           2606    94336    Burial fk_Burial_WorkOrder    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Burial"
    ADD CONSTRAINT "fk_Burial_WorkOrder" FOREIGN KEY ("WorkOrderId") REFERENCES dbo."WorkOrder"("WorkOrderId") NOT VALID;
 E   ALTER TABLE ONLY dbo."Burial" DROP CONSTRAINT "fk_Burial_WorkOrder";
       dbo          postgres    false    232    235    3268            �           2606    94070 3   GatewayConnectedUsers fk_GatewayConnectedUsers_User    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."GatewayConnectedUsers"
    ADD CONSTRAINT "fk_GatewayConnectedUsers_User" FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId");
 ^   ALTER TABLE ONLY dbo."GatewayConnectedUsers" DROP CONSTRAINT "fk_GatewayConnectedUsers_User";
       dbo          postgres    false    225    219    3255            �           2606    94207    Reservation fk_Reservation_Lot    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Reservation"
    ADD CONSTRAINT "fk_Reservation_Lot" FOREIGN KEY ("LotId") REFERENCES dbo."Lot"("LotId");
 I   ALTER TABLE ONLY dbo."Reservation" DROP CONSTRAINT "fk_Reservation_Lot";
       dbo          postgres    false    230    228    3260            �           2606    94202    Reservation fk_Reservation_User    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Reservation"
    ADD CONSTRAINT "fk_Reservation_User" FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId");
 J   ALTER TABLE ONLY dbo."Reservation" DROP CONSTRAINT "fk_Reservation_User";
       dbo          postgres    false    230    225    3255            �           2606    94289 ;   UserOneSignalSubscription fk_UserOneSignalSubscription_User    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."UserOneSignalSubscription"
    ADD CONSTRAINT "fk_UserOneSignalSubscription_User" FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId");
 f   ALTER TABLE ONLY dbo."UserOneSignalSubscription" DROP CONSTRAINT "fk_UserOneSignalSubscription_User";
       dbo          postgres    false    3255    225    233            �           2606    94075    Users fk_User_Access    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Users"
    ADD CONSTRAINT "fk_User_Access" FOREIGN KEY ("AccessId") REFERENCES dbo."Access"("AccessId") NOT VALID;
 ?   ALTER TABLE ONLY dbo."Users" DROP CONSTRAINT "fk_User_Access";
       dbo          postgres    false    3243    225    215            �           2606    94331 #   WorkOrder fk_WorkOrder_AssignedUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."WorkOrder"
    ADD CONSTRAINT "fk_WorkOrder_AssignedUser" FOREIGN KEY ("AssignedStaffUserId") REFERENCES dbo."Users"("UserId");
 N   ALTER TABLE ONLY dbo."WorkOrder" DROP CONSTRAINT "fk_WorkOrder_AssignedUser";
       dbo          postgres    false    225    235    3255            �           2606    94090 #   Notifications fk_notifications_user    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Notifications"
    ADD CONSTRAINT fk_notifications_user FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 L   ALTER TABLE ONLY dbo."Notifications" DROP CONSTRAINT fk_notifications_user;
       dbo          postgres    false    225    221    3255            �           2606    94140 0   UserProfilePic fk_userprofilepic_files_354100302    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."UserProfilePic"
    ADD CONSTRAINT fk_userprofilepic_files_354100302 FOREIGN KEY ("FileId") REFERENCES dbo."Files"("FileId");
 Y   ALTER TABLE ONLY dbo."UserProfilePic" DROP CONSTRAINT fk_userprofilepic_files_354100302;
       dbo          postgres    false    3245    224    217            �           2606    94145 &   UserProfilePic fk_userprofilepic_users    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."UserProfilePic"
    ADD CONSTRAINT fk_userprofilepic_users FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId");
 O   ALTER TABLE ONLY dbo."UserProfilePic" DROP CONSTRAINT fk_userprofilepic_users;
       dbo          postgres    false    224    225    3255            _   �   x�3�tL���㌎�S �jCAA� 1=U�JA�7�@II�,3�(^RT��,�����V�E�(3=��(���g�SiQfb��T
.I,)-V"����Ԣ�Ē��<j9����(��!"��_���_��Z40A
�b�Ƹcrrj1��0b9K8@��+F��� �8�]      p      x������ � �      a      x������ � �      c      x������ � �      l      x�ݝͮ%ٍ^ǥ�jd���&��gR�r�'���[�,�л;��[�CF%�ʐ��;�F���:�2�Yq�����o?�����o��������oy�KƷ�~�����H�]K��������?�?�������������E����������?�7�����?�����ɽ�k��W�]N�>����/Y��sJ?{n��o�r������?�_}�Y̋�\�ۿ|�������������_1) �Hoצ/ </��]	zD�|� l 6_��@�@"��#
0^��kH�L%�A�,X����o�}���� �/�<[	v@0��38� ����@T����#ձ��p����Gه�B#d������"B�!���(���^�BCP'ˌ�A�,F����*�Tʲ��#P)�����^cԙ�P+�!$�P-�e^�;�
A�<z��}��aO&��
A�<$B�>�������\����Z3B�>��0Z��BCP/�!d��y1�q�i��	S�<[��|S�<��;�~��3P/�ܟM�d&P/O���%�T�S��3P-�,]�A�<g��~
�幂�K�)����OA�<O�vI?��b^-B�>��f^���K�!��W��@ͼ8X����yI��~
��5��K�)��׌�OAݼV�z�?u��B�)���	v/駰�ͻE٧��͛��K�)��w��OA��9ؾ䟂�yK��~
j�=��n�bC���� ��� �\�$P3oc浮9�L@��w �}j�m�Lm_s��Q)�$��Q'�ǝ_�ԙ�*�<n�z%�>5�7~�]�udpT�G"��3P{�W�kI���ό��@�|�m_���*�U��A�����bO�VPS)��!������8�����#��s`0�]��v/P0HĐ~v�=��2�&fĐ~�Ѽ�����6vĐ~v�M�:TgOS��ρ�i�w�ɹN!?<M=bH?x�ܷ��u
���i��!��i�_i&z�E� Oӌ���&{����*���1��<M�v�%W�:s��toC�9tx�wl����c��{p�����cgF�����=��?H�K��~
pt�wm�S��c����������m{r�pt�C�9��ݞC�ӫ�s`8��<C�9�	F6
�N�����Y0ϐ~��-��S��s��m�3��<m�`�+��i��� O�F�;��?x�V�<C�9���$�+�P
#iC�9 F��α�����0ϐ~���s��s��m1�3��<m�a�+��i��� O�l�;��?xچ�<C�9�Ӷ�α���0��0ϐ}���p߷2�X�� O�1��<mb�+��i���� Oۈ�;��?x�V�<C�9�o~�����׎�������]֞�_k|���f��bt��C��	�&�_'Xԯ��� �
`ϰ�`��@�N�~�~|� ������� ������=�*0��M�y��p�>C`O�
a��Z��
��Ѳ;�*0�2��!���d��έ�a��I��cXjg2zv�VƠz�0������ݩU�1��i�Ǡ�&�hwhU`�����cPEw�hwfU`�չ�Ǡ��F���*��*�K��~[ݍ�݉U�1����Aݍ�݁U�1����Aݍ��yU�1����Ǡ�f�hw\U`�h�C�1`�m�N��ᨢY��c8�h6�v�UƠ��0��*����y�z<e8����6��g#PA��;��?����#���Y����U�)����Ǡz�gh�}�� Z��c�M�,�ڝZ���Yf���g�Knwj��g�C�1���ڟZ��z��!�T�ÞC�S��cPE�0��*z�shwj�~zC�>�����@�K�(ڟZ��*z̀!�T��(ڟZ��*z�!�T�ÞC�S��cPE�0��*z�;�ݩU�1��g�A=����U�1��ܯ3��ސ���N��wrπ!�T��(ڟZ��*z�!�T��(ڟZ��*z��!�T�˞C�S��cPE�0��*zYE�c�h���ޏ�O��*¹�����]T���[���yͯ#��ie�j�N��OA��v����e�l�N��A��[����mϡݩU�1��w�A���۝Z��ޏ����:C�1��,���*���{�Ǡ���ڝZ�����cPEo{�N��A}Z����c�l�N��A}z����c�l�N�ҏAo�Ч�~�!��}<npj���3��cPE{'�;��?U��C�1�Xb�l�N���-Y���s@��ٓhwn����@��%�~�ʝ\��b��ܯC��b�����*� .i3��?�K�=�v�W��tI�D�A�]Ҭ������=����,�-��~%��-0fd������1�Pa��m��s���xk��Ș�(0��̘��������mh�AT�m[c�<+�( lsFe�ޘ?��?
8��D�Q@ڶ9�ϵ��-��
���mw̟m��cd�c��(�#���[�Gm�����0
h����W�Q@�6@� *�ڶ2Εж��9�
���m�̟u��mCd��(ނ��pwޕ~h����9��@��l��y��m�d��(�m�$s�^�Gm�*���0
hۖ���W�Q@۶M� *�ڶ}2�ж�9�
���m��}e��qH ��L�N�?�����}hۆ�5y��Jk�T�?��?	X۶�D�I@ڶV�8��?
X���<E�Y��6Y�8��?h�F�<E�Y@۶[�8 K?��Ȗ�<E�Y��3��ܟ���m�e���,`n[0{���mf���,�n�1{����mCf���,�n�2{���mkf���,�n4{�����fd�f�"�,5#[5{����0gDQ`p�M�=�����q3OQ`p��=���3OQ`p���=N���3OQ`p�+������@�\��Q�zgd�g�������m��S��������aX�Y�ݶ|�)
����iX�Y��6�)
��46��s��	4���.���HF�l����"hd+h"�$�A#�A{����mKh���,�mC{����msh���,�m[D{����m�h���,�m�E{����m�h���,`n�F{�����hd�h�"�,�G#H{����mi���,�n[I{����m;i���,�n�J{��埅���V��(0�
��0�=�(0�
{��O���Ŵn�i�"�,�L붙�8�?��Q���~/̟�埅�bGf1@aϺ�iX�Y�ݮ��(
����iX�Y��6��)
�����iX�Y ��m@�S�j���a�gwۂ��(0����q؜��!�n[Ps���{0��������m@�A��m�i�Ӱ����m@�S��mj�Ӱ��@A�ۂ���?Ժ-�=N���޶	5OQ`�M�=N����5OQ`0�m�=N����5OQ`p���=N����5OQ`p���=N����n3j�"�,�Q�6��8�?��v�<E�Y�ݶ��8�?�ۆ�<E�Y��6��8�?�ۖ�<E�Y�ݶ��8�?�ۦ�<E�Y��6��8�>AK�ۖ��H?AK����?�?����E�Y�ݶ��8�?����<E�Y�ݶ��8�?����<E�Y�ݶ��8�?����<E�Y�o��3}�_搋_�n
�������fȺ��9Ϲ�� h���qS�� �n�ȼh�f��#����c^�{�%b8r���p����}m>���|���k���>��A����|�á����>���i\]r3l\� �\� ik齮��{D�O������tWMG�=���$D~Qw5� ������f�_�]UM+���ꮮ�A�uWY�	 
غ��{� �ۺ��������wx��db�N�#���f�u�"��Ym�%��okV[�@�5���� �ۚ��}E�m�j�#���f�u?D[�ښ[��    ֬�fk��W�*E�O&Q[s���Z��"��Em�A䷵��yl-jk�D~[�ښW��֢��A䷵���l-jkiDz[��Z���|�ɗ��P[K���z���#���8��"����ZF Q��Cm-3��o롶�A��P[ˎ ��z���l=�֣E�m=����zӹ��w�r2M���A~[O���"����zH���7�� �����z�"����z�"����z�"����z� �����z�"����zZ[�~Ց�RY� �w�RWO�z����M���s|����n�C~O/��\C~M/���C~K/��<_g( 饒^-`H�襎^��{�Ǭ���Jz�� ���Zzq�_�[5�$���魞^#�( ꭢ^3��o�/m�"����z�"����z� �����z�"����z[��ӈ^[�?���z�� ����zs���Gm�%��o룶�#�(`룶�3��o룶�+��o��X�"����z� �������"�����X[���,l=���� ��GS[� ��z4���"��GS[�@��hj�3#���Mm}V��֣��ώ ��z4$QN ��֣�5QZD�]��\֬��\�Z���لv�!�6�e�8��ol�˨ID�_�(�QEg�aFmF�����Q�6:f�vD�_�(�Q;Eo���l��S���{��x�����Ltt���l������oA3[4{`�W�[��6����5�U3�Q@�oY3�5{`��[�̖�����6�m�F~���l��c8�fd�f��G���3�h��J�߂�=d�opDΨs����ȜQ�#��:�>"�G��1��3�+��op�Ψ�#��<�~"�G򌸅����3�櫕��dψ{Ȑ����#���>#�#��?#F�#F<C��G �x����1�4�a082h$-�Hop��ȖЈh^�L�t �F���`�op������>�"!F~�#�F���1
I4�M�F~�#�F�����opd��v���0�2��(`p��ȶ���8gp9�1��?��G��C��G ����D	1�|�=�kD�L�b�78Bi4V����H���!F~�#�F�D�\�b�78�i4��w�Z�f�@3�f��4�b�78�i4%��op��h������:g����H��\!F~���Fs�����a08Zj�Z�����|���/������?���AXD�p���Lk�w��g\�,G�Y��m�Ͱ(b�?�~�m�c0z�1�E?h�_��#���_ab����Grƈ0z����c`��~���T+¸�����a��a�o��T'����\���0��>�w�N>���H��~����8���$>'_��
aH|G��߿v�ߑ�W�+���w$����>8|G_rS$�L?p����w�$�Ɓ�w��u��Gvm@�;�����3�e���O$�}��Wnm��+���ٷ	���G��	��+08�ȿM�?a��&���`�&���a��&���a��&���a��&���a��&̦��	�0"��&L"`D/�M�ԁI��6a#�x�m�$F$�ۄI���o&MPD/�M���9��6a�F��ۄI�8E/�M��H��	'#���տ|M1�6����C�mB��I"�ۄ�ӈ0
l:N3���M�P8���6�C�#�ۄ�Ӊ0
l:�[����0x����6�a���6�!�I��6�!�I��6�!�I��6�!�I��6�!�I��6���9��6���9��6��p�^a� �8G��MH�#�W�&$�V������LH�M�%b(�M�G�Q`� 08���6A`p^F�m�@�#�����D�	�K�0
l.a��&\z@Qa�0`p�^a�0 q�$^a�0 q�$^a�0 q�$^a�0 q�$^a�0 q�$^`�0�p�^a�0��9��6a��#rx�m�G$�
ۄ	��H��	V�{�G+jl&>F�P`�0a�1#�ۄ	��a�&L|� ��6aB��D�	
�-�(�MXP����6aA�G��	�PT�&,|F��MX���$^a�� �I��6aA�3�x�m�g$�
ۄ��H��	H��9��6���"�W�&���W��
�T���$^a��J[_��+lPi�Ҷ����& ��m��3�& ��m��c�& ��m��c�&���m��aT�&���m��c�&���m��c�&���m��c�&���m��c��& ��m��QT�& ��wd�
�4���$^a��F[ߑ�+l�h�;�x�mm}G��M@���H���	��~"��&,T���^`��Pi�'rx�m�B���H��	��~"��&,Tں���q�W�,
m��B�]�B���@��ȿJX�u�gs�7	}6�}6KQ`���gc�gs��u6�u6G���gcgs��m6�m6G�~��Pfc[f�va6n����l�u� ,tٸ�.�@XȲq�]`�Pec
�]`}�ec
�]`{�$S`�
�D٘sW�������� I6�@�6(�1ꮰ8@��m�m����u6�����y�������<F��jllkl��� 96�96�Qa{����(�>@��m��c� ��6��1
,�cc�c��7�����9�
+�ظG��C@��{$�
K�ظG��E@��9�x�5rl̑�+��cc�$^`��s��
�٘#�WX% ��9��.A6�H��	�1G��M@��m���/�f�mjllkl���656�56�Q`�����(�M@��m��aT�& ��6��1
l�cc�c��	ȱ�ͱy�������<F�mjllkl���656����	ȱ�D��M@��G$�
���xD��M@��G$�
���xD/�M@��G��
��xD��M@��G��
��xD��M@��G$�
����Π��jllkl���656�56�Q`�����(�M@��m��aT�& ��6��1
l�cc�c��	ȱ�ͱy�������<F�mjllkl���656���+l�c�I��696^��+l�c�I��696^��+l�c�I��656^��+ld�9��6A6^��+ld�I��6A6^��+ldcd;[�=Qc����g(�M@��m��c�&��ƶ��1
l�cc�cs�	ȱ�ͱy�������<F�mrllsl��696�96���������M@��Od�ۄ��H��	96>��l6rl|"��&l���D/�M�ȱ�$���Qc�9��6a���'rx�m�F��O��ۄ�&�H��	Q6i��l6�lb�l�h]De�	Q6�Q�D�}�F�Ml������ff{p��(l��Ķ�<G���F�Ml�������g�g{p�_*l�����
�6���G���F�Ml��c�+ldڄB�WX,��&��f�6�P�V��	�:��[@�M(�y���mB��l�l
m^a��l�Ph�
�tۄB�WX0 �&=�y��m�C�WX1 �&��|��_�k�n��!D��m�%�(�b@�M�9
�o�>#�
+�ۤ������6�;�(�b@�M�	9
�pn!G�n�aTX1��&��7�P�V��	�:��b@�M8�y�2n¡�+��qu^`ŀ��ph�
+�܄C�WX1 �&ڼ57�P�Vȹ��:��b@�M������V�jn"BX1 �&2B�+��Df�Q`ŀ��Ȋ8*��t�!G��n"'�(�b@�MF9
�Pu�A!G��n2z�Qaŀ�����V��u^aŀ���P�VH��u^aŀ���P�V���u^`ŀ�����V��m^aŀ���VH��u^aŀƛ�P�V�����Ѽڨ�b@�Ml��Q`ŀƛ��ۃ����7���G�2ob3o���7���G�BobCo�+��Ė�VH��M�=8��z�z�Vh��
]^aŀ� �  ��P�VȽ�
u^aŀޛ�P�V��
u^aŀ⛬P�V(��m^aŀ����VȾ�m^aŀ��P�V��u^aŀ�l�s9W��v��ɞ!D��o�W�Q`ŀ��rX1��&�DV���i!G��A�M��W�79=�ȿb8���#����&G"�+�� ����V	89���prB�X1D��:/�b8���	u^`�p��-�y��An���V%��B�X1��Fm^`�pP�-�y��A	n�P�V%��Jpt_�^f�p��.�!�2p�e�<G��An���ȿb8��ׁsV��:p������:p������:p������:p�#����2p��A��+�Ё��A��+�Ё���C�WX1�7z��+d�Fm^aŀ���+�P�=�y�Jp��:��b@	n�P�V(�W�����k?py]���u�/ ����㒕�w�7� �:��ʹ�i������� �^�+æ����2@x��v�K�>ʼ��I���򿭑I.��1
���:WI��_���s�4OQ�#
�s�4�Q�S
�s�4&�
}H�VWGs�?��F���(�D��6\�Q���Bm�,�����.�p]4KQ��	U��h]���l�%���v����?�������w2>���4�����?d�"c��O+�|����1�k̏�}�(Y�/9��t���~����L���W�?��Je}���Iy>̆+��uޏL��A�.m������vɳ����"�>�Rh<�u�c���.��zeu>~_w�~������?����pGO>ݿ]c�|p�rq=�>��}8\���Z������p�f�W�q�� �k�cc��| 8Dچ����[����jŕۤ���*.�&,�).���~�M��.�yMw���?K�oxr�������E�k��}�M�)�	ǝ.���)�ǧ�D����x/-�x>����o�5���å�k�	�׋��|�Zqm9�;��c���5�F��~~y���~�i���o�O��y.��x���{��D7\�np{�^a:\��>�}���;Pa:\��lݸ?9_�G��p��bv���/�'�~��ݎ��vo|r�����o�>@\��ʝ,#�ℸtq�;���Qq���x���_>!._\3os�R�0��7�yyqB\¸�ޤ��� ��7\�O�;_b�<�OV/ß����������p��|��:�1�ק_�2.����x��qu?�n�x��qݿ1�Z�C���� �O�K>�^\%p��*�x�tq��A���w������_�Vz�4X�~~>B\�������,MH��ኃ���wITG����8��߯��+П�#|C�߉�$$��ٮ@oD\ĸN���>Z>".d����k}B�������㼞o�}{�=�܎K�'�P�9Z�<h�_	��~	����M�7�O 7@� �qt��0o��r�|�f��a�597þF�p�ڒ���3`�F��7���n�B��:�B���w1ů��A���O��5OnVɵ�����0�U�鯿�fW5���G�]M�j�"��IeMA�5��iD�uM�k�D_w�5��"���
�vH���]�M'�ȯ���-�ȯ���F������$ٕ���u��+���;G���U�]"�����>"�����>�
�fUv_!E~e�*��"��Y��OH�_٬��Q�W6���*{�k}9�ʮlVes��+���"��Y��A�W6��yD��ͪl�De�*�WH�_٢��R�W�������-�liE~e�*[�����K([T��#���U�p�_قSl� �+[T�2"���U�� ����*[VH�_�C�-;�ȯ�ʖR�W�Pe�Q�W�Pe{��_�|�x>�JV&u��!^��(TڃC�}���Q���D���v:
�}6B
���(��c��xog�����B
}��*�(��cG�>�o��B�=NHѷ�v:
��l!Š+9�z{>�A�_�{���S�=7���ޞ�����P���To��mh��=���q�������7����^�����P���Ro�Ǎh������q#�������^��Ezo/��z܈���O����^��^	�[{����F�W���^*��������:{=nD{�ȯ��^��^!�{�^���^!�{����6���������"����z?nB{�Ho뭶����ڧL�뭺�=D��뭾�R��Vao�(
{���)�+{���)�;����
)�K����;�(`����'�ȯ���>-�H����>�F����I����>=D�����>R���Qo�(
x����)�{����)�{��z���"�����ώ(�{��*'�H������J1����"h͘{�~�:rB����&����*�H�nB����_ބ �j��Mh��V��_ߨ��V��������1
e4��
0����f�h����E!S-�z�D���[���)I�>�����)������w*
蛢�)����;�MQДd}��SQ@�&M�|��3Q��(l��#$��NEuS5�}�NEsSX5��̝���a�t��w*x��;�鵒�����j�#���F#�:�齍Hu	)�{�4�#�H�mdҨϐ"���I��"���F&��)�{�4�'����o~����� d^��O�}���ݫ�Z�����~�����ޯ����O�^�Y}���4��:מ����cpkg����kt������//����%����O���Wj�x�?��}���~������|�x~}���u���C����~����?�q��a^���w���_�^~���_�z}���Z���//?��ܯ��W��v�>5�R r��	R����c��9&�J�z �| �]2�ޮMe@�����2�6�Zr��~��FroSP�%��u��)���)�oS�j�$xS'�P��Q2����9��?��f �| zMJ�Tw�@M> �*� $�^����/����%���io�>�:����N�o��'�uP���@/M;�ק�z�KD�|*�>���ӏ@M�gD�|�⾂��ӏ@]�wD�|*�~������ǫ��ך�ǫ��>���M����_v��U�kc�k< �����gE�i����B�qAvG�����:ϥ}*����O������Tz�oO�t7l�Zb��cT��f�������Au�lv��_Ơ�D6��!��b�%��%�������-6��!��ׂ��쒇H�Ѵ�ػ��w���D6��!��Ԃ��{����J�����=a�S�W�[䞰�(�-��-rO����x��'ly��7{�E�	[�"��"�E�	[c������=_���翆�õ�=]� ���ţ��=[� ��~Ń��=Y� �5�E�Z!���L-r�zEȯh<P���Bz?�J6�/����P��P���x��皙�K�ǀg��{��AH?\"�'����^�{lx��'�y��Jx��'�=(�_+�fd�h��H����}�ك"�hF��f��Mx��'�y���Mx��'�=(�_:�fd�h��H/m<Ќ��ٽ���t�7�X�����h�!���@3�R��6hFSB�����h��"���(0�+��o<<
��)���yB���ã�h��"������_���k���      e      x������ � �      n      x������ � �      g      x������ � �      q      x������ � �      h      x������ � �      i   �   x�3�LL����T1JR14P�)�3ήJKO��0Hs�rK1IM	u+�0�)5O���Huqq�-��v-t�J�+�H�t� &9�]�\\�8---t�u-8��ML�8K8�� 9�9]|=��b���� [�#�      s      x������ � �     