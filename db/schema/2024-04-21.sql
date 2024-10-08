PGDMP                         |            cemifydb    15.4    15.4 K    t           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            u           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            v           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            w           1262    94359    cemifydb    DATABASE     �   CREATE DATABASE cemifydb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE cemifydb;
                postgres    false                        2615    94360    dbo    SCHEMA        CREATE SCHEMA dbo;
    DROP SCHEMA dbo;
                postgres    false            �            1255    94370    usp_reset() 	   PROCEDURE     	  CREATE PROCEDURE dbo.usp_reset()
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
			' [
      {
        "page": "Map",
        "view": true,
        "modify": true,
        "rights": ["Status"]
      },
      {
        "page": "Burial",
        "view": true,
        "modify": true
      },
      {
        "page": "Reservation",
        "view": true,
        "modify": true,
        "rights": ["Status"]
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
      },
      {
        "page": "Settings",
        "view": false,
        "modify": false,
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
       dbo          postgres    false    6            �            1259    94371    Access    TABLE     �   CREATE TABLE dbo."Access" (
    "AccessId" bigint NOT NULL,
    "Name" character varying NOT NULL,
    "AccessPages" json DEFAULT '[]'::json NOT NULL,
    "Active" boolean DEFAULT true NOT NULL,
    "AccessCode" character varying
);
    DROP TABLE dbo."Access";
       dbo         heap    postgres    false    6            �            1259    94378    Access_AccessId_seq    SEQUENCE     �   ALTER TABLE dbo."Access" ALTER COLUMN "AccessId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Access_AccessId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    215    6            �            1259    94379    Burial    TABLE       CREATE TABLE dbo."Burial" (
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
       dbo         heap    postgres    false    6            �            1259    94386    Burial_BurialId_seq    SEQUENCE     �   ALTER TABLE dbo."Burial" ALTER COLUMN "BurialId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Burial_BurialId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    217    6            �            1259    94387    Files    TABLE     i   CREATE TABLE dbo."Files" (
    "FileId" bigint NOT NULL,
    "FileName" text NOT NULL,
    "Url" text
);
    DROP TABLE dbo."Files";
       dbo         heap    postgres    false    6            �            1259    94392    Files_FileId_seq    SEQUENCE     �   ALTER TABLE dbo."Files" ALTER COLUMN "FileId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Files_FileId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    6    219            �            1259    94393    GatewayConnectedUsers    TABLE     �   CREATE TABLE dbo."GatewayConnectedUsers" (
    "Id" bigint NOT NULL,
    "SocketId" character varying(100) NOT NULL,
    "UserId" bigint NOT NULL
);
 (   DROP TABLE dbo."GatewayConnectedUsers";
       dbo         heap    postgres    false    6            �            1259    94396    GatewayConnectedUsers_Id_seq    SEQUENCE     �   ALTER TABLE dbo."GatewayConnectedUsers" ALTER COLUMN "Id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."GatewayConnectedUsers_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    6    221            �            1259    94397    Lot    TABLE     '  CREATE TABLE dbo."Lot" (
    "LotId" bigint NOT NULL,
    "LotCode" character varying NOT NULL,
    "Block" character varying NOT NULL,
    "Level" bigint NOT NULL,
    "MapData" json DEFAULT '{}'::json NOT NULL,
    "Status" character varying DEFAULT 'AVAILABLE'::character varying NOT NULL
);
    DROP TABLE dbo."Lot";
       dbo         heap    postgres    false    6            �            1259    94404    Lot_LotId_seq    SEQUENCE     �   ALTER TABLE dbo."Lot" ALTER COLUMN "LotId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Lot_LotId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    223    6            �            1259    94405    Notifications    TABLE     �  CREATE TABLE dbo."Notifications" (
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
       dbo         heap    postgres    false    6            �            1259    94412     Notifications_NotificationId_seq    SEQUENCE     �   ALTER TABLE dbo."Notifications" ALTER COLUMN "NotificationId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Notifications_NotificationId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    225    6            �            1259    94413    Reservation    TABLE     U  CREATE TABLE dbo."Reservation" (
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
       dbo         heap    postgres    false    6            �            1259    94420    Reservation_ReservationId_seq    SEQUENCE     �   ALTER TABLE dbo."Reservation" ALTER COLUMN "ReservationId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Reservation_ReservationId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    227    6            �            1259    94421    SystemConfig    TABLE     r   CREATE TABLE dbo."SystemConfig" (
    "Key" character varying NOT NULL,
    "Value" character varying NOT NULL
);
    DROP TABLE dbo."SystemConfig";
       dbo         heap    postgres    false    6            �            1259    94426    UserOneSignalSubscription    TABLE     �   CREATE TABLE dbo."UserOneSignalSubscription" (
    "UserId" bigint NOT NULL,
    "SubscriptionID" character varying NOT NULL
);
 ,   DROP TABLE dbo."UserOneSignalSubscription";
       dbo         heap    postgres    false    6            �            1259    94431    UserProfilePic    TABLE     b   CREATE TABLE dbo."UserProfilePic" (
    "UserId" bigint NOT NULL,
    "FileId" bigint NOT NULL
);
 !   DROP TABLE dbo."UserProfilePic";
       dbo         heap    postgres    false    6            �            1259    94434    Users    TABLE     �  CREATE TABLE dbo."Users" (
    "UserId" bigint NOT NULL,
    "UserName" character varying NOT NULL,
    "Password" character varying NOT NULL,
    "FullName" character varying NOT NULL,
    "MobileNumber" character varying NOT NULL,
    "AccessGranted" boolean NOT NULL,
    "AccessId" bigint,
    "Active" boolean DEFAULT true NOT NULL,
    "UserCode" character varying,
    "UserType" character varying NOT NULL
);
    DROP TABLE dbo."Users";
       dbo         heap    postgres    false    6            �            1259    94442    Users_UserId_seq    SEQUENCE     �   ALTER TABLE dbo."Users" ALTER COLUMN "UserId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Users_UserId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    6    232            �            1259    94443 	   WorkOrder    TABLE     �  CREATE TABLE dbo."WorkOrder" (
    "WorkOrderId" bigint NOT NULL,
    "WorkOrderCode" character varying,
    "AssignedStaffUserId" bigint NOT NULL,
    "DateTargetCompletion" date NOT NULL,
    "Title" character varying NOT NULL,
    "Description" character varying NOT NULL,
    "Status" character varying DEFAULT 'PENDING'::character varying NOT NULL,
    "Active" boolean DEFAULT true NOT NULL,
    "Type" character varying NOT NULL
);
    DROP TABLE dbo."WorkOrder";
       dbo         heap    postgres    false    6            �            1259    94450    WorkOrder_WorkOrderId_seq    SEQUENCE     �   ALTER TABLE dbo."WorkOrder" ALTER COLUMN "WorkOrderId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."WorkOrder_WorkOrderId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    6    234            ]          0    94371    Access 
   TABLE DATA           Z   COPY dbo."Access" ("AccessId", "Name", "AccessPages", "Active", "AccessCode") FROM stdin;
    dbo          postgres    false    215   �j       _          0    94379    Burial 
   TABLE DATA           �   COPY dbo."Burial" ("BurialId", "BurialCode", "FullName", "DateOfBirth", "DateOfDeath", "DateOfBurial", "FamilyContactPerson", "FamilyContactNumber", "FromReservation", "ReservationId", "LotId", "Active", "WorkOrderId") FROM stdin;
    dbo          postgres    false    217   �k       a          0    94387    Files 
   TABLE DATA           ;   COPY dbo."Files" ("FileId", "FileName", "Url") FROM stdin;
    dbo          postgres    false    219   �l       c          0    94393    GatewayConnectedUsers 
   TABLE DATA           J   COPY dbo."GatewayConnectedUsers" ("Id", "SocketId", "UserId") FROM stdin;
    dbo          postgres    false    221   �o       e          0    94397    Lot 
   TABLE DATA           W   COPY dbo."Lot" ("LotId", "LotCode", "Block", "Level", "MapData", "Status") FROM stdin;
    dbo          postgres    false    223   p       g          0    94405    Notifications 
   TABLE DATA           �   COPY dbo."Notifications" ("NotificationId", "Title", "Description", "Type", "ReferenceId", "IsRead", "UserId", "Date") FROM stdin;
    dbo          postgres    false    225   ��       i          0    94413    Reservation 
   TABLE DATA           �   COPY dbo."Reservation" ("ReservationId", "ReservationCode", "UserId", "LotId", "DateTime", "BurialName", "DateOfBirth", "DateOfDeath", "DateOfBurial", "FamilyContactPerson", "FamilyContactNumber", "Status", "Active") FROM stdin;
    dbo          postgres    false    227   �       k          0    94421    SystemConfig 
   TABLE DATA           5   COPY dbo."SystemConfig" ("Key", "Value") FROM stdin;
    dbo          postgres    false    229   ��       l          0    94426    UserOneSignalSubscription 
   TABLE DATA           N   COPY dbo."UserOneSignalSubscription" ("UserId", "SubscriptionID") FROM stdin;
    dbo          postgres    false    230   J�       m          0    94431    UserProfilePic 
   TABLE DATA           ;   COPY dbo."UserProfilePic" ("UserId", "FileId") FROM stdin;
    dbo          postgres    false    231   g�       n          0    94434    Users 
   TABLE DATA           �   COPY dbo."Users" ("UserId", "UserName", "Password", "FullName", "MobileNumber", "AccessGranted", "AccessId", "Active", "UserCode", "UserType") FROM stdin;
    dbo          postgres    false    232   ��       p          0    94443 	   WorkOrder 
   TABLE DATA           �   COPY dbo."WorkOrder" ("WorkOrderId", "WorkOrderCode", "AssignedStaffUserId", "DateTargetCompletion", "Title", "Description", "Status", "Active", "Type") FROM stdin;
    dbo          postgres    false    234   
�       x           0    0    Access_AccessId_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('dbo."Access_AccessId_seq"', 2, true);
          dbo          postgres    false    216            y           0    0    Burial_BurialId_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('dbo."Burial_BurialId_seq"', 13, true);
          dbo          postgres    false    218            z           0    0    Files_FileId_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('dbo."Files_FileId_seq"', 2, true);
          dbo          postgres    false    220            {           0    0    GatewayConnectedUsers_Id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('dbo."GatewayConnectedUsers_Id_seq"', 1, false);
          dbo          postgres    false    222            |           0    0    Lot_LotId_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('dbo."Lot_LotId_seq"', 1183, true);
          dbo          postgres    false    224            }           0    0     Notifications_NotificationId_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('dbo."Notifications_NotificationId_seq"', 28, true);
          dbo          postgres    false    226            ~           0    0    Reservation_ReservationId_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('dbo."Reservation_ReservationId_seq"', 22, true);
          dbo          postgres    false    228                       0    0    Users_UserId_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('dbo."Users_UserId_seq"', 17, true);
          dbo          postgres    false    233            �           0    0    WorkOrder_WorkOrderId_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('dbo."WorkOrder_WorkOrderId_seq"', 9, true);
          dbo          postgres    false    235            �           2606    94452    Access Access_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY dbo."Access"
    ADD CONSTRAINT "Access_pkey" PRIMARY KEY ("AccessId");
 =   ALTER TABLE ONLY dbo."Access" DROP CONSTRAINT "Access_pkey";
       dbo            postgres    false    215            �           2606    94576    Burial Burial_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY dbo."Burial"
    ADD CONSTRAINT "Burial_pkey" PRIMARY KEY ("BurialId");
 =   ALTER TABLE ONLY dbo."Burial" DROP CONSTRAINT "Burial_pkey";
       dbo            postgres    false    217            �           2606    94456    Lot Lot_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY dbo."Lot"
    ADD CONSTRAINT "Lot_pkey" PRIMARY KEY ("LotId");
 7   ALTER TABLE ONLY dbo."Lot" DROP CONSTRAINT "Lot_pkey";
       dbo            postgres    false    223            �           2606    94458     Notifications Notifications_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY dbo."Notifications"
    ADD CONSTRAINT "Notifications_pkey" PRIMARY KEY ("NotificationId");
 K   ALTER TABLE ONLY dbo."Notifications" DROP CONSTRAINT "Notifications_pkey";
       dbo            postgres    false    225            �           2606    94460    Reservation Reservation_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY dbo."Reservation"
    ADD CONSTRAINT "Reservation_pkey" PRIMARY KEY ("ReservationId");
 G   ALTER TABLE ONLY dbo."Reservation" DROP CONSTRAINT "Reservation_pkey";
       dbo            postgres    false    227            �           2606    94462    SystemConfig SystemConfig_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY dbo."SystemConfig"
    ADD CONSTRAINT "SystemConfig_pkey" PRIMARY KEY ("Key");
 I   ALTER TABLE ONLY dbo."SystemConfig" DROP CONSTRAINT "SystemConfig_pkey";
       dbo            postgres    false    229            �           2606    94464 8   UserOneSignalSubscription UserOneSignalSubscription_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY dbo."UserOneSignalSubscription"
    ADD CONSTRAINT "UserOneSignalSubscription_pkey" PRIMARY KEY ("UserId", "SubscriptionID");
 c   ALTER TABLE ONLY dbo."UserOneSignalSubscription" DROP CONSTRAINT "UserOneSignalSubscription_pkey";
       dbo            postgres    false    230    230            �           2606    94466    WorkOrder WorkOrder_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY dbo."WorkOrder"
    ADD CONSTRAINT "WorkOrder_pkey" PRIMARY KEY ("WorkOrderId");
 C   ALTER TABLE ONLY dbo."WorkOrder" DROP CONSTRAINT "WorkOrder_pkey";
       dbo            postgres    false    234            �           2606    94468    Files pk_files_901578250 
   CONSTRAINT     [   ALTER TABLE ONLY dbo."Files"
    ADD CONSTRAINT pk_files_901578250 PRIMARY KEY ("FileId");
 A   ALTER TABLE ONLY dbo."Files" DROP CONSTRAINT pk_files_901578250;
       dbo            postgres    false    219            �           2606    94470 8   GatewayConnectedUsers pk_gatewayconnectedusers_933578364 
   CONSTRAINT     w   ALTER TABLE ONLY dbo."GatewayConnectedUsers"
    ADD CONSTRAINT pk_gatewayconnectedusers_933578364 PRIMARY KEY ("Id");
 a   ALTER TABLE ONLY dbo."GatewayConnectedUsers" DROP CONSTRAINT pk_gatewayconnectedusers_933578364;
       dbo            postgres    false    221            �           2606    94472 -   UserProfilePic pk_userprofilepic_1_1525580473 
   CONSTRAINT     p   ALTER TABLE ONLY dbo."UserProfilePic"
    ADD CONSTRAINT pk_userprofilepic_1_1525580473 PRIMARY KEY ("UserId");
 V   ALTER TABLE ONLY dbo."UserProfilePic" DROP CONSTRAINT pk_userprofilepic_1_1525580473;
       dbo            postgres    false    231            �           2606    94474    Users pk_users_1557580587 
   CONSTRAINT     \   ALTER TABLE ONLY dbo."Users"
    ADD CONSTRAINT pk_users_1557580587 PRIMARY KEY ("UserId");
 B   ALTER TABLE ONLY dbo."Users" DROP CONSTRAINT pk_users_1557580587;
       dbo            postgres    false    232            �           1259    94475    Lot_LotCode_idx    INDEX     m   CREATE UNIQUE INDEX "Lot_LotCode_idx" ON dbo."Lot" USING btree ("LotCode") WITH (deduplicate_items='false');
 "   DROP INDEX dbo."Lot_LotCode_idx";
       dbo            postgres    false    223            �           1259    94476    u_user_number    INDEX     �   CREATE UNIQUE INDEX u_user_number ON dbo."Users" USING btree ("MobileNumber", "Active") WITH (deduplicate_items='false') WHERE ("Active" = true);
    DROP INDEX dbo.u_user_number;
       dbo            postgres    false    232    232    232            �           1259    94477 
   u_username    INDEX     �   CREATE UNIQUE INDEX u_username ON dbo."Users" USING btree ("UserName", "Active") WITH (deduplicate_items='false') WHERE ("Active" = true);
    DROP INDEX dbo.u_username;
       dbo            postgres    false    232    232    232            �           2606    94478    Burial fk_Burial_Lot    FK CONSTRAINT     v   ALTER TABLE ONLY dbo."Burial"
    ADD CONSTRAINT "fk_Burial_Lot" FOREIGN KEY ("LotId") REFERENCES dbo."Lot"("LotId");
 ?   ALTER TABLE ONLY dbo."Burial" DROP CONSTRAINT "fk_Burial_Lot";
       dbo          postgres    false    223    217    3250            �           2606    94483    Burial fk_Burial_Reservation    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Burial"
    ADD CONSTRAINT "fk_Burial_Reservation" FOREIGN KEY ("ReservationId") REFERENCES dbo."Reservation"("ReservationId");
 G   ALTER TABLE ONLY dbo."Burial" DROP CONSTRAINT "fk_Burial_Reservation";
       dbo          postgres    false    227    3254    217            �           2606    94488    Burial fk_Burial_WorkOrder    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Burial"
    ADD CONSTRAINT "fk_Burial_WorkOrder" FOREIGN KEY ("WorkOrderId") REFERENCES dbo."WorkOrder"("WorkOrderId") NOT VALID;
 E   ALTER TABLE ONLY dbo."Burial" DROP CONSTRAINT "fk_Burial_WorkOrder";
       dbo          postgres    false    217    234    3266            �           2606    94493 3   GatewayConnectedUsers fk_GatewayConnectedUsers_User    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."GatewayConnectedUsers"
    ADD CONSTRAINT "fk_GatewayConnectedUsers_User" FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId");
 ^   ALTER TABLE ONLY dbo."GatewayConnectedUsers" DROP CONSTRAINT "fk_GatewayConnectedUsers_User";
       dbo          postgres    false    3262    232    221            �           2606    94498    Reservation fk_Reservation_Lot    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Reservation"
    ADD CONSTRAINT "fk_Reservation_Lot" FOREIGN KEY ("LotId") REFERENCES dbo."Lot"("LotId");
 I   ALTER TABLE ONLY dbo."Reservation" DROP CONSTRAINT "fk_Reservation_Lot";
       dbo          postgres    false    227    223    3250            �           2606    94503    Reservation fk_Reservation_User    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Reservation"
    ADD CONSTRAINT "fk_Reservation_User" FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId");
 J   ALTER TABLE ONLY dbo."Reservation" DROP CONSTRAINT "fk_Reservation_User";
       dbo          postgres    false    3262    232    227            �           2606    94508 ;   UserOneSignalSubscription fk_UserOneSignalSubscription_User    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."UserOneSignalSubscription"
    ADD CONSTRAINT "fk_UserOneSignalSubscription_User" FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId");
 f   ALTER TABLE ONLY dbo."UserOneSignalSubscription" DROP CONSTRAINT "fk_UserOneSignalSubscription_User";
       dbo          postgres    false    3262    230    232            �           2606    94513    Users fk_User_Access    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Users"
    ADD CONSTRAINT "fk_User_Access" FOREIGN KEY ("AccessId") REFERENCES dbo."Access"("AccessId") NOT VALID;
 ?   ALTER TABLE ONLY dbo."Users" DROP CONSTRAINT "fk_User_Access";
       dbo          postgres    false    215    232    3241            �           2606    94518 #   WorkOrder fk_WorkOrder_AssignedUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."WorkOrder"
    ADD CONSTRAINT "fk_WorkOrder_AssignedUser" FOREIGN KEY ("AssignedStaffUserId") REFERENCES dbo."Users"("UserId");
 N   ALTER TABLE ONLY dbo."WorkOrder" DROP CONSTRAINT "fk_WorkOrder_AssignedUser";
       dbo          postgres    false    234    3262    232            �           2606    94523 #   Notifications fk_notifications_user    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Notifications"
    ADD CONSTRAINT fk_notifications_user FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 L   ALTER TABLE ONLY dbo."Notifications" DROP CONSTRAINT fk_notifications_user;
       dbo          postgres    false    232    225    3262            �           2606    94528 0   UserProfilePic fk_userprofilepic_files_354100302    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."UserProfilePic"
    ADD CONSTRAINT fk_userprofilepic_files_354100302 FOREIGN KEY ("FileId") REFERENCES dbo."Files"("FileId");
 Y   ALTER TABLE ONLY dbo."UserProfilePic" DROP CONSTRAINT fk_userprofilepic_files_354100302;
       dbo          postgres    false    3245    219    231            �           2606    94533 &   UserProfilePic fk_userprofilepic_users    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."UserProfilePic"
    ADD CONSTRAINT fk_userprofilepic_users FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId");
 O   ALTER TABLE ONLY dbo."UserProfilePic" DROP CONSTRAINT fk_userprofilepic_users;
       dbo          postgres    false    232    231    3262            ]   �   x��SM�0>o�b�<�<v�{It�C�lT��O͏�����6���}f�e�[@ͤ����ЋX���1~�!�1�Sy��Is�`��>���Bn��!�;F�D�U�g�U�I�J�z��b3�J����w.�f �?�"�������?�+bȰX;ث���ʇb\4���Vl�UT�˟���Zb���G��*$tS�^��V��{/�ƨ(���TG�PJ/�zu5      _   �   x����r� �g�)��!	�f�ءK�,$%���8�:���Wܩ�t*���	���E� l��ݑ�pSq�p��;XG0!g���o]�^���w��J�-�_C��C��Y�XĊ]S������v}���3VC�[�֙�X�Z�d]5����|��7�_���_�ٸ����T$��2���)����4*�GʿO��%�1A�$�@���δ��a�u����2���"~�ឝ      a     x��RK��J^w����v�$�	 �EAP�l�(�����ҹ�����M�IN����ǽɩ�\r`9�̠ċ�8���21JP��o׮c���϶�M��yNi~�1+�9��'�u�=g1c�[F��5khV������2�e�p�Z�WV48�[<�Ӻ mZͺ���2,�z���
�c�hO���#���'-��E	�~������H��;db�4}�u�j�ۄRG+��Y�g�H<Ê���xp�O��tJ)Ѥ���h��@���^�(�Y�	^i9.C�\�K��I�JW��=Uj�h׆h���l!�������~ئT�Z��l�>�'[�<Ήt��N.酷B(���\}!?=�{^D���u�y]h���3��A?T�e@\A�΂�:�t����v���٧�k}(t\<��4w�۝�A�j?��;����ц���N`�Z2�l�5� W�`K�a5�;�&�B�[�0��)�q2�R,���������X�m��g[�W���ߜ���+e���9��Q�Kxw{;}�VQ~�I��p�/�6�Z�\��W�i��fKI���՛����|�ݚ�Rv��b�!�͋H�I���qפ��@b���33٩�-�ô�+M��Z/ho�'���B��g�jm:�� ���B���U��;�ޕ�Xm����qbi�.7�g�ntN��X�� j��R{��;Y����al�'�m�Y�&8½��[t-R�x����B�� x�!Ǘ	,kdg�]��ʧW�	o>���������Җ
      c      x������ � �      e      x�՝O�%Gr�׏���J�����ޑM.x���W���G�Ƙ������a�:��6�fĂ��	�W�>��9Q�uR���]������ﯿ������ٲ߼����i�Sf9��������~���Q��^�|�͟������?������_��o��_~���?Ɵ��?�������z�մ���(C��/���2W):������~����'���.���R�����_������?���WK���Z��O8Rd"���^��Wyο���<��o������U�/�k�c�ZUG��ꮄ#ǸHY���뒗�f���  r�|�w9䓮��覣�������VT�٥�=F��cj�>�FWms��|�����w߿��U�/߽ڿ�Ht�������¢�8B,�d�O����,�f-���Q�o�d}��F�^�Y�<���~������i�9qp��3��4���q�>�Ȁ3p��c7��<<� g�8�])p*p��3�y�I�S������6k?>ؘT��}-���4Ǿ@�8�L+	���ߟg��e�`�,���z(��>�-k���i.�}Gj
��0M�l3�mfwi�D��h3�K�&�,$�9=�<�f!���Ҥ�5�fn�&K��� ��K�$�s��=����1;�7�u�~!���|`��m�|oO��b����������@]G�0�7Pg]���>�t9�ڴ���ki;1?�y��*�|�5�&�`�����u_���x�M�Qov�!�����kmryH8��c�_������+r~��󱲿������ :TW��޾�uZAЮ����S��~��o�|u/_�Qn�@A�]�qZ�-,�!� .���k�I0@0=�^*;]$�	���[z&X �.��M�q�E�̚��<~}��w"�*.�z�.B���z �lr�۬� ~�����j KVג����1	`��Z��(aS]�%�k�c�C��A�%�k��p�F�KVג�9ĕ ���#O=�f�G�#��|t�`�������"��v0`�ݵ�Џ*ƀ%wגc���ɒ�x{�}������=��q.A�!���t	B�~ܗG{�0�]��C��!����'y�Kzȟ0�Q]��C������'�x�~{ȟ���Zr�!�kɱ��	K�%��',y��{ȟ���Zr�!��ȱ��G��#��y��{�_���Zr�!���kɱ��K�WK^���ч�?�ý��C�������x.� �����s{���C^�%=�o�� ���aȫ����C^�%�<�o��R ���������C��%/גc���\K�=�oX�r-9���a�˵��C��%oג#������ȡ��Y���u��C�,p��:r�!��������C�,���Zr�!X�&K���0��;�ӻ��#�,p�<���,0�=���,�ŭ �|?� @<����@� "O�S* �y��� �@��~����s��G���V<=�O ��8�`?e�3��s�� ψC��S`��q�~V�xFz���a�|8�L_����p쑾����}��gı�
#ψc��F,dī�2�.&۽��q�������|��G{$np�Z]��3q���������Kz*n0��]��cq�L#˽�~<�`�ux�'�?����>E��Ş�BEuCE��!T47TĞ�Q0֚*b����j���{4s��f��>ʹZs3E�	�\���"���r��\K�=㣜�5גc�(�jT�E'����ը��/?t.E3W�f.&���V���� ���b�F�VLz�G�U�b+&=�تQ���Qlը؊	"��j�kE �Gd�Z5u�,���b������Qlպkh�Gd[5*�b��#2��Zw-9���b��]K="�תuבc�Ȩ�j�u��#2��Zw9���j��]K�="�ڪuגc�Ȩ�jTm��[���V�z���C���j�k��Gd�Z5�b��+�(�jTlE��|[5*�b��C>��[1A�!�V���� ���b�F�VLy�G�U�^+�=�ת׏c�(�jӵ��C>���t-9���b�6]K�=�تMגc�(�jӵ��C>z��t9���j�6]G�=�ڪMבc���jӵ��C>���t-9���j�F�V{���S��j�kŗz�G�U�^+&=�תQ���Qlը؊b�(�jTl���|[5*�b��C>��[1A�!�V���� �^�F�V{�G�Uۮ�����v-9���Plնkɡ���b��]K=�/[��Zr�!�تmג#��Vm��z�_�j�u��C�B�Uۮ#��ڭ�v-9���Po�ŵ��C�B��R����H�)��J���v������+���B�9��J���y�_h�Rj�b�Г�BM�RM�!�P�TuC�<)/TE)UE���]QJ]QLzV^h�R�m-����(��bO˨�R�-����(��b�˨�R�-����(��B��Q*�7��Qx��{s�X*�7��р��7��S3*����{lF�V6��7<���c3���3����Q�����B�������L��ftHieg�"��Q"����"��/�Hiek&�Г?j���5B��=R�ؚ	!��)m��W�ؓ?�����{�G��6ߜcO����s��eR�|s�=��MJ�oα'�Ii��9��:)m�7Ǟ�Q)����ؓ?:�T}o�=�w����{�G/��oα'c��9���23L���Reg��=��K���BO�(�Reg&�Г?��Tٙ��'tc��5B���X�l̈́z�G;�v�fB=��K;[3!D��Q�����J{�G?�vߙcO�h���s��Y�}s�=��#K�oα'�di��9�䏖,��9���ђ����ؓ?��t��{�GU�ߛcO�����s��eY:|s�=��-K�-KD�Qz��]YJ]Y��=��,K�,�z�G[�R[�!�䏾,��,F�=��0K�0�z�Gc�Rc�!���,�ʬB���YJ�Y7�ȓ?:��:�� ���,��3Ǟ�Q���7�ؓ?z�t��{�Gq�NߜcO�h���s���Y:}s=��:K��ͱ'�g��9���,]�7Ǟ�Q���7�ؓ?�t��{�G��.6g�G��cO�(����L�z�G��.vfB=��BK;3!���Q������{�G��n�fB�<�o�h�fk&�ȓ�F��n�fB�<�oi�fk&����F��nv�+A���IK��̡'��.-ݾ9���7ʴt��z��h���s���NK�oΡ'��>�^|s�<�o�iu��b�ȓ�F�V�J-F�<�oTju��b�ȓ�F�V�J-B=�oTju��b�ȓ��֔���Lu�&��7*�:W���G��7*�:W�1B����s%#D��7:�:w�B����s'#����	ֹ�BO����	��'t�u�c�ȓ?*�:W�A���`�+�!��N�Ν`�z�G'X�N0F=���s'#����	ֹ�bO����	��'Tju��b��c3*�:Wj1B��Z�+�!�،J�ΕZ�zlF�V�J�ڞ�F�[Q�G�k�r��;\;,���.�^��3���θG�r���ݢ^>&.V�[P�秨�\vQ`�CfPPֹ�r��kD�||~������Ǖ��|�����nϻ7��;Q�չ��/?���_�[�� ��_�K�� ��+� �M�+�� �})�����6�/���w!T}u��"��7!}u.�"��� �|un���|B�W皯+@�;J�:�|U������ѳ�y4��8��/?��ǟ��w��I�z��n�����`���Ug?Zz4X7w��r�j5;<����}��f�b�>}�;Šg����y\�-_�>�9�y.� .��o����h���\���	zv4X/�x�әvˎ�X�5qu���hmBm㼍�ǈv45��G�&�QD TD��wIu0A�MR=B=Dz�TG�PD�"��B �B��wHl���	~�y�$gpl���	�	"o��_i<Dޙ3���x&��1g`|��Ly_���J�� ��������3A�    ]9�+m�g������+�g��ۊ��W����w�~��Zr�ME+
�V�y1�a����WqCE�]Q�RB�RM#�|�(�*�b���;����� t���>h	��;��d��ZBg�b)Y�ٺ�WJ���%t���>k	��;Z�d��Z"g�Z)Y�ٺ�UJ��ȡ��Ɖ!�Oic�雜qIa�$��'�4�u���a �0R�+�������\��w]�������?;R�)Yn.,��Y$u����i����'�4�GMͅ3?:��Ѧ��Vi��6Χhh��PX��\��Gy�i�E7���V󭴓��}�x���_jq��9�<o�H	���}�>���l��b��������wZ����lH\ĮSY��;�������1`Z8�.o�gX��	�k��H���!�p�{_���]��?������(�sI��c��z�q�;�����yy�N�>C��'C(��xm���ɐJ�R޶���d8���a�M�ة�<��ܠ�o�ȭ�v.ַf%;�W��.���:�*u��Z�o�qw��U��ˏ��w�~�R�D��;P?V�~�	boF��(j#��;}��*��1A䝾�c��ǘ �N_T�U�c��B�ju�E�W�
�ju�E�W���ju�E�W��ju�E�W�:�juoE�W�j�juoE�W�j�*�.1A�]�Ǽw>�]�m{]��G^w>�?����2n���8���t�c�hC�޾��4>��/94���qZY��ʆ��izJ2<m�C̺����f�l=����I9V}w^�Q����30>ެ�x��%�����:�|�����t���h�WX�o�uW2�ϽO>�ڲީ�1��R�I���|^�ֿ�A���-������n�|�z���5����[4?�j�8nP���I��Y�؆��K��)����-s�����t��]RW�u�������c^8ο�c>}�?��	�N��$d��ʱ�QV:A��$�����D#�I��f��R�z(YDiF�.$z�K򉢆�JQ���+�='Lx�2���dŬQ��ص?��,$f�ru�s�L^Μ�� ��;�������ܱ^�Q�sm'T��V�%�,揵y#JY� ��,Yd1���T��2p�R���B�7�X�t��sF~�}�h�ZݍG��|8"�Vw�Q�7߫=C��t�|��eź\�,wZ�u{�nY���V\�$�4��M�a7�,[uY��bq�5o��#��Ŧ.KY,.����yd�'*m�,Yd1�oә�k�7�_P����,�-�e�c�@1�oW���my1�,j���c�"���+=!j�y{B"]�(����q��ƜRՅI�)3{�q{�R5!����Hi'"d������X��b��4R����3�bËV���F��z����O#L�Y���f���n��N���G���f��&d�o��%��u��uZ�㹹+�0{b���v�����3�z��s7�>�B���Z�|��Ļ���[��SR4�>�e�V/�BI�����T.�4)���L�5�vio�Ug�	Z2�˅�r�M�5��~�&2>���c&�0�~q��V����ܨ˙!�5��,�Fs��%����X��b����X�H�&2\�<ʘ���=,L��y�X.Le�����Qf����¤Qf��Oq~&��V�%�.���yOr	c�?Յɣ�����#�Dʘ�����Q�N�h"e���ra�(c�?������<�,���o�\a�(����� i�,�Y�=/��1��1��3�4Ϙ�����T�e)sU�C���,f��=���Y�)[���Q�b��ΣLm�8ra�븭<@���x-��2����(1�5b��v�p2UPH�<�4�X�\�xio�>U㧑e����d�e[��}�c'��l�w�=����\���yW]��7�z}eI��y��]�E�GO����.K]��7���cf����EdW�4������F;fB��#+.Me���������a,�6h%+եɣ��
/.�c%�)('+��t�ɣ
�
-/����,�6�(+åɣ��5�5�O6O�Z��ri�h��BKL��-	�yT�R7)Ӥ�歞����>vF�y4�RE)���Y�kJWyk3ʦ� 7�Mm�����<��%�Y�
K�&�6�B/�h;JJ�A�U�^i�h�,@5�}�QZBmP�*���4i�A�T�u�~^��!ͣ��{ߤ�1z+� �^)� @���G� �d�5�D� P} ���9��5i]0�6�T��4y�A��MZ̣*6�:6�&�6h��٤��D� P�&����qr�5	�a"m�m�i�h�,@���J�Hd��d�<� 4.ھ�&�Y�q���&�6����.��y�A��(�p�I��7E����*a"m���0����Y��Di�0�6���ԥɣ� �
�*a"m���i�h�,@��J�Hd�He�<� PM*����	
�(�4i��������*a"m�:�,x�ɣ� 5��*a"m��T�ɣ��`S�+p]%L�� տ2Mm��������\$�v��oD��K������֡圵t��������N��L�tRkT�}���u}0�(��(ꠤe�ߒ�~!���D��_���������+�uQ0�,��uy,yd9�)���r]L$�0�,L]��Wç��D�K�`�c�/Wӧ��<�Ls}Q&�0�|_��Oˀ��1����Ɯ_��Ok���1����Ƽ_��O���1�Ń�#����?��%�~�`�c�_��OKy�Yf�U=�4�,3�z5Z�K$��La�����i�/�0f�uy0y�1�W��D������̿]͟��	c�ߪ�G<���?���f��7�`�������i�/�0f�mx0y�1�od�ץ�9�ߝ�ż�-�e	�WŬ�]�����bί�a�#��^��W���bƯՃ�#��^�����S�Ճ�"L-f�Jk����G3~La����ӂ_a��uy0y�1�׫��_a��{�`�c��i����c�߫�G3�N�����F�cg�80i���?/���̿&�0f��j����G3��<�<�wZ��<���������~Z��#����La�����y�/�0�9�u��F��:h�����]�Ã�#�����?/����,&�0f��j����G3�Y<�<�OZ��<���������_W���T�,�7�u�ò��Ŭ^��V���b�?�ÒG��G/�т_]����`�c�?�?Z��#��*La����ӂ_a��W�`�c�I�pg�/��墷�h�,͇����!�La�/-��Ya�B��`�c~�h�����c~���G��Mo��Ya�/w�`�c���h�,�0����w`�c�I�,po�,�0f�{x0y�1�ߴ1����c濗�G���[q�F�G�GN�h�(�B�B��J�G4�����8�ތ�u�4Ҡ	��wh�H�2<;
�[)�#Zq��h�H�Z�BK�V�G������8�b�u���\s(�@�xW�3#����ыw��d�G� *ƻ�d�1���x�,�6�j<��#�D�<���W�� @�xD�ID���ճ<� 
PG�da�j�x90�8HԓG4��A��<^�#Σ'�z4��A ��<^L#����&�8h�����<� Pg�d��j�xy0�8ԛG4��A ��<^"�#u�M&q�>��	�@@�yD�I�Gw>m����4�BO�C�h��=�=^-�#��M&q�J���@�ezW�L� P�����*��&�8T��k�y�A �^=��$U��aqZy���Mq�����x�������h�_�h���].<� 5���am��b�hi�8@%{���<� P��$Ry���nK�y�A ��=�I�����Ө��=��=�ɣ�<�أ5^<̣"��1N"u�	�x�z�G���c�D� P��m�0�:HԿ�8��A*�
���au�
���q��T@=|��4ꠈO���q�.>�2��
buG�'�:H��w[ḄRu�1N"u�
��ﶆ�G�*�    c�D� P7�m1�:H���8��A*��>^EL�*��;�'�:����-#�Q����'�:HT�w[G̣R�1N"u�
��﶐�G�j�c�D� Pq�$�u����w��?�����]��s���C�Y��Zv�sԧgy����%.Eg�C?�����1���W��v; 6&HC͕P����t��WCѕP���rު3���u%Tvu{*�F�]	�]1NuPx%�xu{*�G�N�b�D� tR����tu:���q���I�W���yԱ�Y���q�3�#�S�<�,�T'�:8�*�FT`U��b�<�-�R[ϟ�pp�7�1�]S�(h�G��qArh�As5Q�ɚHx(�EM"m`���Y����I�,��"x#ku�Q�-�qҨ�ϡ�WY��'���hO�ǭvt:�k{����p��^�_P�99j*�U��l�_��3�W=?W9	���k�sfy>�����}��ڏ�A�Q�!�5�Qn<�Xw��������i'��8�>���￰F���h�\�z)G_��غ�0�Ɵ1��[i'Y/����̺�~q��n``B`�<k����������ށ��=T>�	�%���c�3�����'�gR�OsϖϤF��/�I�>�0�I?�1�I?�2�I?�4�Gŋ�Uݣ��x���3/�:H�&<�$R�@�#��#����|y���l��l��9��C�O������i�u�cÐ��A�Mê�8i�K��(;	ͩ���h���j�S�W).N;g�$4�h�JsƵ�|�9Xj1���8d$��i.�,o��8�p���z�?
����{8��#�wGg�8Z����X���$���,'Q �d{8�A�DP���'TK��f-��RL�D�,��$J�Am.N�D�,Tuq%�f��v'S"h��pq%�f��N'Q"h��rq%�fڊ���B�Yh#�����ْ��,�U�%���Yhk.N"U�Ц.N"U���=�L�f�m�8�,T�B�tqY������$�P���m'�P����8y�Z"PJk���+tKZ]�D��["���$J�����(tK�=�L��["���$J��N'Q"�t�8�A�D���ɔ�%�^\�<��["��D�d��u�$w�a��W�%Q"�zsq%�a�����(K�{8���DЇ��(K}�8���DЗ��(K}{8���D0���'K�A�G�@0-��$����hM�80-�h��ii`t�&S���he�iY`L�&Q���h%�iI`l�&S�f�h��i9`RX����\A`Y��eI��%��\�DQ`Y���$�˲��N�0�,���$Jo�M'QX�rq�ey`n'S XVqq�$�e�`]�>�d���$�m�`U�%Q"�f�K]�D��BW�p2Y�6]��Id��,tM'��n��\�D��B��p2Y�6��d:���!���b���˒�tz�1t7'�ڋy�V'���b�����C{1����㡽��������^�C�rq�xh/���N"���S\�4sh/(�)�	��|"@����-�T&Q(�Ŕ��$J����.O�X (�)��ɔ�1e�<���L�'Q2@������j!�uw�n�����?��~��8e{�d
:�R<j�c���<�<Z�A�>����$w�G/��hE�G3U�݀e�G7��݀��G;��1P����ǣ��P���hȣ��P����ȣ��P���-yT��@�Bz��n@yR��rJ���#�+%�G{.��I�Ж'�S%J	�˓�)���4�I�pʔЙ'�S%J	h͓�)�����I�@@�RBCJ���@�R� �qJ �<)e��8%��8W0YJ@�4N	D�(%�e�S%J	���)����J�pʔP(�S%J	(��)���TJ�@@�R��qJ�eJ	��@@yR
�Ed%_ipGE�PG��&QJ@I�PK�(QJ��x�J�P(��@�R���o@�R���o@�R���o@�R
�(SJ@e�Pg�(OJ@i�tN	���p&j�sJ �<)�١䯲�x��f9o�3��;䑪��$?i��+�y��� c�e��#�O�h�hc'��4׳����3�88��I�N��l�s�>�~G&u8��I�Nξ✳۬)������G��S���m[2�3pj|.N"upj|����Ll[S���Y.N"u:p�w6]���cw�*��I���\p���K�T0p���H���������3p��ɣ�D*�k*�S/O
򨳀S����QhM���S��ӊ��o��AȩאS�˟�R���\�D� ��kȩ�s�T!�'�:9�r�h��)�A�i��I�BN�����X}G�l���F-����3[upg���I��l]��H��zuq�����J����'ղ�����(y�D�4ͥɳmJQJ�.M�=S�J���$�0�(�.M��R8BIo�X�()OQ�8EIo�$�<�����d�J�s;�8KIo��%�#t�$��PP���P�BI@��P�P%����m�ĹJ2x�(�J�$��PP�-�{����?�휰J{���w���<���jk��s�>�b�r�V��h�4���xőc0�6�]\����$��@�k��@��0��^�/���^��*�p���*�K0�!��\~/�u	ΛT��t�{(�G�K=Z��(�%���_#�� �t	�or�{/� X.��M�>T�^0�]���V$E�ˏ�R^~���<)��Zy�cRB�O觻���{�h9��ž�cv)e��>??�λN�31h���i�h�J��oq�;�9P��T��Q\r��i.��C�h3�F]�y~�Z�e4ݥ�eV�A��fx4�|���Ù>��;�́#��|����8�p��sƁ��>���Z\�<a�Z��00O���Y�0P-���	��@m.M�0P-Tui�ja�v�&O���h2��fa�N'Oh��q�fa�n'OhZqq�fa�Q���OOrN�0Ъ��'4��4y�@�0�ԥ�����]�<a�Yhã���@�>N�0���q��0ж��'��-.N�0�����c}xm)KPZ]�<a@-hsi��0����	ja@�K�'��M�0�-��q�na@���'t�}�<a�[�������N{Fy���Fs������@�>���X���Y��@X�]]�*�AX��>|���B����>}ەy���,�/����,�o�.�а8f���8]�$4f���n�|:�B�}�݅%����q�xw��c��,t�w�=�$��a3��o����CuXK��'LK��'LK���'Q"���}��'O"���}��'M"���}���rA�@0-��޻Kyc�<0-��޻g�<q`���n��V�<�9�>�}��3M�\��Y�&�y.3�y߫v)�J�˼s޷�=���eֹ�;՞i�8�2�Y��k�R��o�����]���p�͟��w]q͟��s�/��c��t�/����t�/��c��,t��+N"�桋wxN�f��wxN�6n��Uyj7�2�nK��xK�D�-l��E8y��D�y��'Q"ؖ6��"�<�`["ؼ͋p�$����px��IR,l��u�ɓ�X"ؼ͋p�$)�j��E<Y"�tÔk&X�=�Ci)h�)ՇI
���4�'M*�����.O�Xp����>O�\p��'O0�Ĕ���I����\�D�@PS�ϓ'<j�7�Ɠ&����6��k|>�>�g�Gq7����?B� pu�ԏ%��8��8�c� $r��1��X.��X��q��?"�<��=�p����
B� p{���BAHdn�c��L����g$��A"���]��|�h�DPU����ʒ'�>N*�i'�4� �qRyO;�I(���{�	'M"@��T��N8i���+N�D�9����p�$4�I�=턓&�AN�i'�,� r�r Z  vV��;{9*�;�%O"h�vy��N8iJ�[�'M"@��p��I���c�4� 5r�=r��'�FN�G�q�$��	��1N�D�9�9�ɒP#'�#ן��KP"'�"��'�BN�C�&��~���%M
@}�p܅%M@y�p{܅%���9N�:�%���6N�7����'\waIc�(�n���d�|��	��͵��D�d��l�մD%��b�/���X��	����,�ˠ\M�]�q��Մ��n8i��jB�j7�4v�r5�v�N�A��޷N]q)GP�&���_Y�̚(W����	'ɸ�Ϗ��W�j�hl�9�Ӧ�Y�,���v��?�8c����j�u�Q�̧X8��v�\��l�K�*����蝁*����&W���U9�ӷ�[P ������A�:��4Ʊo��@@�:����4(��v������ hЙv\�v�P�!�U����k�;�^;m��Z�</N�a^�b�6��Iph�����$Ip����I�f�'�w'˲Ay���=��r�^?v�0Jt��=v�/Jt�^<v�.Jt��:v�-Jt�^9��,Jt�^8�_,Js��?_}����.*�      g   ~  x���Io�H����h��ݨ���&K:F�e0A� ڦ%�hPr���)��e.�Du�ｮ�~���Y\=�t)���ȋ���z������&?��{K���B���E�����]�e��&n��{3�L�	�?�<$���_��D# ��H�u��?��t�h\�g^u������J@�J&]1�
�u�M���t@T�i�E�q��KҜ &�aB��
A�P2���j����}5�#I|Q�>A2^.��F�:+���+}|,����y�1*����q�R,(���gq�e%j���HW��K&֛t������aq��?�,K�o�ϧ��F�ys]I@������"x���%`��"���m�G»�V�d�XDY|���:0�FE��'�Z[�P�{�kǣ��t6�N~���!��jK�ϻ�Y.>�u4�P�v&�#���Ķ�>�6[�ۆ��ɸ��C��B���:`*��H�-��2�^J��,�����f}U��!�nɦ3�B��ț
̞�2�G�C��K2>�H�����>�e���2��AHU�@<l���\���^�[
��2�U�-��ڦ�yS�Ӄ�.�$��U�NTU��Q�سx���I�ܻ��>=��T��=��	M۠��M��`�[�Nh6�m�qQ{U6@�
�	�PTG qv���>#R�J���L�Gf��|ZF�m(�����z���3u�\33W�`�%���Ր�@z��:L��T�]<[h�I�^1}p��z�;Thn�.�n��ߎG��"�m_';mc�g&kQ�2=�Z����v���2ֳ�������D�+2�w�� ;�Dz4_���g�Р�@xf�jP�J��U��$�����)0      i   �  x��VMo�0=;����)Q�ǭk�aE���S/Y�bŚ�����Q���v��,�!�����`S��L�Wi�tt��F�d�1JS� �ڶ�Ӊp�n���F]�_���������8��hw�`IGʁM0�hS<��m����X���k��}HG��^5Z���v����՗o,$���������@�j��A D����-FM
l���ק��C�^��b�Dx�������,C�q>0Ļ����S�nH-$jbB%Cgf���1-�tJ��d6U�u�P5�$����񡭿�cg'�����W}�Y�,n_����y��x�~]}o�
	D�txή�I`"��"ߵ�������r��_�~��� F40)�=�X}4Z!�OH�ǹ�v��ʛ���?�9����L~"�E�9��jЩ\�j#D"e�K`�0���]�m���C�pJQi��N�j~6?�*=+����6��j�|Ccg�4�lik)��$�A ?��Š�I���˽���B�w�]7k���j��1L#����<:��a�m�g����|�4�A��p
ݨ	����j��bu�"��5���n��ʐ7�+�=$�M�f�0�BQy3J�t�u����[pٻ�������jEY0�n.�e��G�=bk�a���x��iof�ZJ�f,��X/�rE�t0�<R�A3�"�![��1��G�a�Ա*87�z[�o������5��~�L
�      k   @   x�sv
�t�tvq�q��28�S�J2�2�KR�R�+�������֩����� b;      l      x������ � �      m      x�3�4�2�4����� ��      n   n  x�m�[��0��믘��\ʥ\Q@P�(zs^PQA.�_?Ό�&�vҦI����]��K���|���0<#��:oV��j�bI)0D}S��!v��z>���_�QD���$����r_�],���E���u�Df҄��2��N ��c��*��ɔ�j�.]��;nV�ni ��>�ޑ|��_�,J��:�]��Fq�gv"mmD!�-�b�m*�Մ�������hC��Pwi����~�^ ����6�H��'��9B5��V��=]�j��(��$�e����Ԗg����m�K���)���7�}�UX~x��F�Z�KO<��7W�|D�/B���写e�%_��5��rc�o �{���w�w������ɟ�u��V'A���Gܑ�� �*�G�m.�e��:V��)�vՇ�p �����0z�^��n�sG�t,Y�#V�}��,�0�4�� ��!�N��@w�xG)���1,��q"��`$�,���y��7�݅D�����iD��Q�K#bNVA�B]IG3[��[8 ���۽��5�_���`.ә�1={���ĩ%h�0Kb�Ҭ��_�uSX#��Ŷ�G��??Gzd���^�7���      p   �   x����n�0 ��~�u"iR��R�*$�"�n��5��1REL{���~����h[�'��� @DB�"9�֯�n�͇g�����) �7x�����G�ʻ�䡅d�-r�7)t�ՙ��mb� N��95��)N}s��if7����t����/��4�n��>��C��Pf�r�)MU�^RSy�]�z�<u�e���s]�/-IZ�$AU��ד"�kZQ����'�^��鿒C��p�{)a�H     