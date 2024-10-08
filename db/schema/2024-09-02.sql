PGDMP     9                    |            cemifydb    15.4    15.4 K    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    94359    cemifydb    DATABASE     �   CREATE DATABASE cemifydb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE cemifydb;
                postgres    false                        2615    94360    dbo    SCHEMA        CREATE SCHEMA dbo;
    DROP SCHEMA dbo;
                postgres    false            �            1255    94370    usp_reset() 	   PROCEDURE     v	  CREATE PROCEDURE dbo.usp_reset()
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
        "page": "Dashboard",
        "view": true,
        "modify": true
      },
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
		"FirstName",
		"MiddleName",
		"LastName",
		"MobileNumber",
		"AccessGranted",
		"AccessId",
		"UserType")
	VALUES (
			'000001',
			'admin',
			'$2b$10$LqN3kzfgaYnP5PfDZFfT4edUFqh5Lu7amIxeDDDmu/KEqQFze.p8a',  
			'Admin Admin',
			'Admin',
			'',
			'Admin',
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
            dbo          postgres    false    6    215            �            1259    94379    Burial    TABLE     �  CREATE TABLE dbo."Burial" (
    "BurialId" bigint NOT NULL,
    "BurialCode" character varying,
    "BurialFullName" character varying NOT NULL,
    "DateOfBirth" date NOT NULL,
    "DateOfDeath" date NOT NULL,
    "DateOfBurial" date NOT NULL,
    "FamilyContactPerson" character varying NOT NULL,
    "FamilyContactNumber" character varying NOT NULL,
    "FromReservation" boolean DEFAULT false NOT NULL,
    "ReservationId" bigint,
    "LotId" bigint NOT NULL,
    "Active" boolean DEFAULT true NOT NULL,
    "WorkOrderId" bigint NOT NULL,
    "BurialFirstName" character varying DEFAULT ''::character varying NOT NULL,
    "BurialMiddleName" character varying DEFAULT ''::character varying,
    "BurialLastName" character varying DEFAULT ''::character varying NOT NULL,
    "BurialAge" numeric DEFAULT 0 NOT NULL,
    "Address" character varying DEFAULT ''::character varying NOT NULL,
    "LeasedDate" date DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL
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
            dbo          postgres    false    6    217            �            1259    94387    Files    TABLE     i   CREATE TABLE dbo."Files" (
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
            dbo          postgres    false    6    223            �            1259    94405    Notifications    TABLE     �  CREATE TABLE dbo."Notifications" (
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
            dbo          postgres    false    6    225            �            1259    94413    Reservation    TABLE     �  CREATE TABLE dbo."Reservation" (
    "ReservationId" bigint NOT NULL,
    "ReservationCode" character varying,
    "UserId" bigint NOT NULL,
    "LotId" bigint NOT NULL,
    "DateTime" timestamp with time zone NOT NULL,
    "BurialFullName" character varying NOT NULL,
    "DateOfBirth" date NOT NULL,
    "DateOfDeath" date NOT NULL,
    "DateOfBurial" date NOT NULL,
    "FamilyContactPerson" character varying NOT NULL,
    "FamilyContactNumber" character varying NOT NULL,
    "Status" character varying DEFAULT 'PENDING'::character varying NOT NULL,
    "Active" boolean DEFAULT true NOT NULL,
    "BurialFirstName" character varying DEFAULT ''::character varying NOT NULL,
    "BurialMiddleName" character varying DEFAULT ''::character varying,
    "BurialLastName" character varying DEFAULT ''::character varying NOT NULL,
    "Address" character varying DEFAULT ''::character varying NOT NULL,
    "BurialAge" numeric DEFAULT 0 NOT NULL
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
       dbo         heap    postgres    false    6            �            1259    94434    Users    TABLE     4  CREATE TABLE dbo."Users" (
    "UserId" bigint NOT NULL,
    "UserName" character varying NOT NULL,
    "Password" character varying NOT NULL,
    "FullName" character varying NOT NULL,
    "MobileNumber" character varying NOT NULL,
    "AccessGranted" boolean NOT NULL,
    "AccessId" bigint,
    "Active" boolean DEFAULT true NOT NULL,
    "UserCode" character varying,
    "UserType" character varying NOT NULL,
    "FirstName" character varying DEFAULT ''::character varying NOT NULL,
    "MiddleName" character varying DEFAULT ''::character varying,
    "LastName" character varying DEFAULT ''::character varying NOT NULL,
    "BirthDate" date DEFAULT (now() AT TIME ZONE 'Asia/Manila'::text) NOT NULL,
    "Age" numeric DEFAULT 0 NOT NULL,
    "Address" character varying DEFAULT ''::character varying NOT NULL
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
            dbo          postgres    false    6    234            n          0    94371    Access 
   TABLE DATA           Z   COPY dbo."Access" ("AccessId", "Name", "AccessPages", "Active", "AccessCode") FROM stdin;
    dbo          postgres    false    215   �p       p          0    94379    Burial 
   TABLE DATA           L  COPY dbo."Burial" ("BurialId", "BurialCode", "BurialFullName", "DateOfBirth", "DateOfDeath", "DateOfBurial", "FamilyContactPerson", "FamilyContactNumber", "FromReservation", "ReservationId", "LotId", "Active", "WorkOrderId", "BurialFirstName", "BurialMiddleName", "BurialLastName", "BurialAge", "Address", "LeasedDate") FROM stdin;
    dbo          postgres    false    217   �q       r          0    94387    Files 
   TABLE DATA           ;   COPY dbo."Files" ("FileId", "FileName", "Url") FROM stdin;
    dbo          postgres    false    219   �q       t          0    94393    GatewayConnectedUsers 
   TABLE DATA           J   COPY dbo."GatewayConnectedUsers" ("Id", "SocketId", "UserId") FROM stdin;
    dbo          postgres    false    221   �q       v          0    94397    Lot 
   TABLE DATA           W   COPY dbo."Lot" ("LotId", "LotCode", "Block", "Level", "MapData", "Status") FROM stdin;
    dbo          postgres    false    223   r       x          0    94405    Notifications 
   TABLE DATA           �   COPY dbo."Notifications" ("NotificationId", "Title", "Description", "Type", "ReferenceId", "IsRead", "UserId", "Date") FROM stdin;
    dbo          postgres    false    225   ��       z          0    94413    Reservation 
   TABLE DATA           :  COPY dbo."Reservation" ("ReservationId", "ReservationCode", "UserId", "LotId", "DateTime", "BurialFullName", "DateOfBirth", "DateOfDeath", "DateOfBurial", "FamilyContactPerson", "FamilyContactNumber", "Status", "Active", "BurialFirstName", "BurialMiddleName", "BurialLastName", "Address", "BurialAge") FROM stdin;
    dbo          postgres    false    227   ��       |          0    94421    SystemConfig 
   TABLE DATA           5   COPY dbo."SystemConfig" ("Key", "Value") FROM stdin;
    dbo          postgres    false    229   ڥ       }          0    94426    UserOneSignalSubscription 
   TABLE DATA           N   COPY dbo."UserOneSignalSubscription" ("UserId", "SubscriptionID") FROM stdin;
    dbo          postgres    false    230   *�       ~          0    94431    UserProfilePic 
   TABLE DATA           ;   COPY dbo."UserProfilePic" ("UserId", "FileId") FROM stdin;
    dbo          postgres    false    231   G�                 0    94434    Users 
   TABLE DATA           �   COPY dbo."Users" ("UserId", "UserName", "Password", "FullName", "MobileNumber", "AccessGranted", "AccessId", "Active", "UserCode", "UserType", "FirstName", "MiddleName", "LastName", "BirthDate", "Age", "Address") FROM stdin;
    dbo          postgres    false    232   d�       �          0    94443 	   WorkOrder 
   TABLE DATA           �   COPY dbo."WorkOrder" ("WorkOrderId", "WorkOrderCode", "AssignedStaffUserId", "DateTargetCompletion", "Title", "Description", "Status", "Active", "Type") FROM stdin;
    dbo          postgres    false    234   ��       �           0    0    Access_AccessId_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('dbo."Access_AccessId_seq"', 1, true);
          dbo          postgres    false    216            �           0    0    Burial_BurialId_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('dbo."Burial_BurialId_seq"', 1, false);
          dbo          postgres    false    218            �           0    0    Files_FileId_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('dbo."Files_FileId_seq"', 1, false);
          dbo          postgres    false    220            �           0    0    GatewayConnectedUsers_Id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('dbo."GatewayConnectedUsers_Id_seq"', 1, false);
          dbo          postgres    false    222            �           0    0    Lot_LotId_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('dbo."Lot_LotId_seq"', 1183, true);
          dbo          postgres    false    224            �           0    0     Notifications_NotificationId_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('dbo."Notifications_NotificationId_seq"', 1, false);
          dbo          postgres    false    226            �           0    0    Reservation_ReservationId_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('dbo."Reservation_ReservationId_seq"', 1, false);
          dbo          postgres    false    228            �           0    0    Users_UserId_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('dbo."Users_UserId_seq"', 1, true);
          dbo          postgres    false    233            �           0    0    WorkOrder_WorkOrderId_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('dbo."WorkOrder_WorkOrderId_seq"', 1, false);
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
       dbo          postgres    false    3267    223    217            �           2606    94483    Burial fk_Burial_Reservation    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Burial"
    ADD CONSTRAINT "fk_Burial_Reservation" FOREIGN KEY ("ReservationId") REFERENCES dbo."Reservation"("ReservationId");
 G   ALTER TABLE ONLY dbo."Burial" DROP CONSTRAINT "fk_Burial_Reservation";
       dbo          postgres    false    3271    217    227            �           2606    94488    Burial fk_Burial_WorkOrder    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Burial"
    ADD CONSTRAINT "fk_Burial_WorkOrder" FOREIGN KEY ("WorkOrderId") REFERENCES dbo."WorkOrder"("WorkOrderId") NOT VALID;
 E   ALTER TABLE ONLY dbo."Burial" DROP CONSTRAINT "fk_Burial_WorkOrder";
       dbo          postgres    false    234    217    3283            �           2606    94493 3   GatewayConnectedUsers fk_GatewayConnectedUsers_User    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."GatewayConnectedUsers"
    ADD CONSTRAINT "fk_GatewayConnectedUsers_User" FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId");
 ^   ALTER TABLE ONLY dbo."GatewayConnectedUsers" DROP CONSTRAINT "fk_GatewayConnectedUsers_User";
       dbo          postgres    false    221    3279    232            �           2606    94498    Reservation fk_Reservation_Lot    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Reservation"
    ADD CONSTRAINT "fk_Reservation_Lot" FOREIGN KEY ("LotId") REFERENCES dbo."Lot"("LotId");
 I   ALTER TABLE ONLY dbo."Reservation" DROP CONSTRAINT "fk_Reservation_Lot";
       dbo          postgres    false    3267    223    227            �           2606    94503    Reservation fk_Reservation_User    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Reservation"
    ADD CONSTRAINT "fk_Reservation_User" FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId");
 J   ALTER TABLE ONLY dbo."Reservation" DROP CONSTRAINT "fk_Reservation_User";
       dbo          postgres    false    3279    232    227            �           2606    94508 ;   UserOneSignalSubscription fk_UserOneSignalSubscription_User    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."UserOneSignalSubscription"
    ADD CONSTRAINT "fk_UserOneSignalSubscription_User" FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId");
 f   ALTER TABLE ONLY dbo."UserOneSignalSubscription" DROP CONSTRAINT "fk_UserOneSignalSubscription_User";
       dbo          postgres    false    3279    230    232            �           2606    94513    Users fk_User_Access    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Users"
    ADD CONSTRAINT "fk_User_Access" FOREIGN KEY ("AccessId") REFERENCES dbo."Access"("AccessId") NOT VALID;
 ?   ALTER TABLE ONLY dbo."Users" DROP CONSTRAINT "fk_User_Access";
       dbo          postgres    false    215    3258    232            �           2606    94518 #   WorkOrder fk_WorkOrder_AssignedUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."WorkOrder"
    ADD CONSTRAINT "fk_WorkOrder_AssignedUser" FOREIGN KEY ("AssignedStaffUserId") REFERENCES dbo."Users"("UserId");
 N   ALTER TABLE ONLY dbo."WorkOrder" DROP CONSTRAINT "fk_WorkOrder_AssignedUser";
       dbo          postgres    false    3279    234    232            �           2606    94523 #   Notifications fk_notifications_user    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Notifications"
    ADD CONSTRAINT fk_notifications_user FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 L   ALTER TABLE ONLY dbo."Notifications" DROP CONSTRAINT fk_notifications_user;
       dbo          postgres    false    3279    225    232            �           2606    94528 0   UserProfilePic fk_userprofilepic_files_354100302    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."UserProfilePic"
    ADD CONSTRAINT fk_userprofilepic_files_354100302 FOREIGN KEY ("FileId") REFERENCES dbo."Files"("FileId");
 Y   ALTER TABLE ONLY dbo."UserProfilePic" DROP CONSTRAINT fk_userprofilepic_files_354100302;
       dbo          postgres    false    3262    219    231            �           2606    94533 &   UserProfilePic fk_userprofilepic_users    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."UserProfilePic"
    ADD CONSTRAINT fk_userprofilepic_users FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId");
 O   ALTER TABLE ONLY dbo."UserProfilePic" DROP CONSTRAINT fk_userprofilepic_users;
       dbo          postgres    false    231    232    3279            n   �   x�ŏK�@��ίf-��vF��h�.nΨC:#3W#���=!	�gu9܏�9>/�rh)z˩;(ed��([��wgn�6RZ�����\����������?���Y��!��,'��FB�Uka�i �V�Y��fOW�����o?����D�;�(U6hM����'2������DB��      p      x������ � �      r      x������ � �      t      x������ � �      v      x�՝O�dǑ�׭O!p54/2##�w�������=��Ȑ	�c��ݙ���uOQ���4:bAa�ļW�����̈<����m�?~���o�������~��j���o�����U���������z�ѵ����~�O����O?���:���?��_���ӟ���c����ÿ���/?�{իͦ�d�^z�~Yr�U�,EG[]����;?����O�q���*�ԩU�l��?������{��ot�����3M.�D�r���f�S����r��gV��ӛ���'�Z�j���0�K�g��߂|!P��W$�Yۿ\k���Z�MD�71�%�S�~G�e�߿����O��5>����u��~�Ƿk�OݴKղ���M��j���RV�E�/գ���M��^�,f~x;��D��_���4�Lo,���J,m���T�k�چ��?q����ݪ��]���V�)��W��;t�
�KqZ��l�	�q�]SS�,�tg���8� g�8�M����ǩ��>�ڥ/�G��|�>��&>N_G5e�Us�uɧ���ky�<9AD�o�y�K��U^^ea�K0�U���&�G0J{�א���H���`������Z�[T�K��W�C  h.�~��E���2��w�;ĮO?�J�%�p2�y�6�봫��6��r	"��^l�V\��⶿� �AhqZA .AdqS@sB��6�KZ�TA`.Adqj ���r���%��+
InwI�]g�&���~��(������Z\��}U��ؠf*��Z��� g�\�ȝ�a�3U�`?�I6ș�K������׷"��iw	�\qd��`/�������f�Y��Z��j����^_�x[��w֪]�yC�	ܱVZ�Ol�gp�:��{�a���g!����LF��	@J}�Տ/�xi^�� ȿ�wm�ꐩ�VY���c��KK�_���Զ�ɿ��V�r�ހ�0|���0��\�z�����bo�t�=s�^���g�ߋ��a��5|�չ��k�bo�t�#a�B~��\��~��0zܫKzf@���{�)a-�����B�.A�-�A����B��]��[H�܇Kyi@��� bo!�qw�8�����Jr��	I�$�ޱ�<\I��ȟ���Jr�E��$W�C/�'y��{�?���U�؋�	E�"�^�OH�p%9�"B��+ɱ��<I��^O?5�"A�gu?~�E��Oq	B/�K�,3��g�c?��b6���)�T� �6ł����ަ��F�� �6H5: ���)p@��)&��M��Q��G@�m
��j�u��)&H�嚊����rME�m��Rm��z�b���Jr�m�Y �˕����@���ȡ�)f�"/W�CoS�E^�"�ަ���\I���e!�ƕ�����%�#{��S�Z������7*f 4!�NŬ�#D^�Ϫ@0!�J���#D^f�:��|����Y!	����S�	�ׄ�+M�,T_B/5��oB�mWNB������rۦ@ݪ�n���u����^3ԭ��z�<�hZ4s7$��X5���᥁�� ܳ�ឡw-��`���-��/�����U���޸x<�=^읋�'���:�O����P>��BmpF�Έ>譋g$�!��E�3vF�z�A�����{�A����"O)L$ݩ�4B�1���;�fB����;m,̈́y	�	�X���7�v��W��H����s����;m�8��yA��6_�c� �N�/Ρw^&"���z��;m�6�^�#�N��ͱW�ȽS��9��� ��s�?��T}q���Gx�*����O}��+D���2����Gv�*+3!D^���	���v|��Z([�A������#�޺@ �*{B�u��;U��z��wj�-!��R���[B��ĩ����޺@L��o-bo] (N�w��.��滋�[��S��9�����|q��u��85_�Co] ,N����[���ks�$�i��9��"���{��q�}q��u��8�иZk��}Z��}�"2N)2���^6#3N)3�!���Dh�Rh�B�?BהB�!���kJ�k/��͈]S�]{A�lF�R��B�e3rהrט ���k:|Y��lF��_�b/�����W���f����-���kJ�k�{ٌ�5�8�^6#~M��ͱ�͈`��ks�e32�t��{ٌ3��8�^6#�L�/α��1����*�~l�e3"�t�2���lF��NVfB�lF��NVfB�lF��NV�;B�9r�t�4B��B��.�fB���_H2���L�W�Qf�X�	!��!�L+� ���X�._�C���e���9��a�M�/ΡW�yf�|q��_4��s��B��_�#��͌͘ ��!��8Ԍ"��B͌C�!��!��8ԌB��B͌C�!���̚���]]���N`�������#��r�s�!��!W�8W�"���匃�!��!X�8X�B��,g,��W�Hd3Ndc��+$�'�1B�?ٌو ���`Ɓ`�z�D0�D0F��G"�q"#�^�#�8�B���f�F�W�H3Nc��+jj1A�e3���!���ZƁZ�{ٌ@-�@-F�lF��q������U��e�٥^�}��I�$��g�tD���3NѺ}|��jQ?>V8�ȯ����3�U`�Ef�  �8 ���]�G����p����?��-���_��_2�u{�ތ��D�q��ȯOd~g~1A�7("��#�� ��� �K��� �{.��Z�+�k
�Q_��#���e�E �_B��2��"��� d|g|���
Bȗq�� �_�_�v=o,��G{��j�h��� ����������6ӫ��}/F�ǯN���,v��h�n�je�j5;4�������gG��s �<�l������q�z�~�W�hc������T.ٿ[�ѐue�u�ʶ���Xm+�j��`�8cM�z���E3�TJ#��5�2\�jH"��D�?�!��RD��2T
"`��CR��J9DzF�CP)��	"�HR*�0A�	��!x�!�>�%In����g�ȣ93�B3�Ly2�c^h�	"�tL�M�3A乜�x�x"=��1�.4����r:��� r;�c�]h��	"�u����3A䩢��w��$�*�~��Jr�"C6S�l&6v����L���� �ظ!��R0�v��`�:�m���Ԑ�T��Sڙb��tw*B;SC*S��NEhg:�`n�`^���O���Z:&��&���F,�n8vLJ	MJ�Ǐ���1)%4)��7;&��&�� �C���JA�ǎQ)�Q)&����1*%4*��71.%4.���u��	�v��RB�R�YwLL��z�Yw�L����Yw�L����Y��6�Z�SCVh�n-�!,�N��z�ԐZ��Sz�t�5�K�Z��zZafY�\��r�vfiWv4v�k�?�ӏ=6����k����2��\�����v�2su⊺���8���/�\v�Պ���r�1<+�.�B���-�Ʒʴ�%k��{��B�[�KRs�6@�� ���zZ.���z�43�2�^��S&��홁�k�dV֥�c�?\�>���F��AO�)���2�����Ύ$�~�?}��Ot5��e!�Ww<8/t:~H�$�����d�W��˳0�j|���_�ԖK�U߭e��U-?<ߺ�M���/-���es\���!1���׽hOφY�;��,?��[��N�����~Զ�����V��^��Z����Ư�H���p��E�M�Z��c�Y_p�'���XG�P����K�
�c���KH�J�c���K�tB�tL���&�����׀\v���2z����q�_̝\���p1wr%�w�#�@�]�}6�b��J�]��~�P�x�~ɧ���ð�	�����E�W�����a��j�2A�aX����XD{+�����Oh����a�]�1A�aX�=!����a�    j@�a؁�$�n����B
�wI
�%I ��` D�Q�� �dh4�� ��R0��(B� "+�@�F��,�4 ��g4�ϸ��2��F��H�@zF���|"b <�O�C���h���#�[�ݚ�L<�w��zk���50{�9�w������_�Gv�_���\}|������}�䱒Y/}+I�}[3%�fJz�����d(�<PR�y�K�/GB>���3�k�k��|��������^��6���ZR�Z
FJ��ظ���C�lq���i}R��?�������]��-�Q�^��O�X��-�C7�2�Z��đ{��7�ꭈC���nn�[����U����/"���t�DZ/���������?�\��o߽?��}j�z��e�/��m��F9�G�*2�ӤG=�i�1K��VW�����*�Թ�fČ���1n���O_�ɛ�1A��H���ͱ��_e�+������m�$%�
�Iꍤټ-�E�x(Y���Do$*۝�t$vH�Nr��>�Gk�P���I���=����t\/t<����5�cRdxJR�?TMP9�+�.���ʀr��,OKҔ��Ҋ˒�,���V=a�S�cW��,Y��J�1OY��j�d)�1_�<��S��ZwY��efE�7+���ToX$�)�y�Ox�@K�$������>L1C/��^�9�K����܏z�TШ����>m�TI�b��6��D\���X�7Z�3A䩝Ѡɢ.A�	�Qs	"��
��t_E�O���ot��bO��W�cO�У7�4�Uk�J�{b��b��Q��;�b!��&�nY�F�1�v�q�p���}��W��.�oU��6n�K��L�r�q�}w����deѳ���c�R=p����~N����l~�}��~��sv?U]�4߲�e��en��0D��/Jm±���߱�/:=�4e9���&���Xƺ�v�������������44��_`�Qh4�4v]j�ƎXu
�fO���3���9�?Ma���r���l+Щ��k� �lc��Qծ��S�;�Hu���6:NHug�B�u4<��L�M����x2A�6��T괩$s=��|����R�]�&���J��s������u��0����W4V��; �8K�.L'`gMc�5��~Md���gӬ&Ka��5���J~�Ee9k�.�6�t�9*�Y���l�&�������������2'*ev&Oe�����2'����>]�<�9�ߗ���2��(.L�ʌ���:��
s��ǒ�.G�G�Z �
s����2G��y��*s�t&Oe��0�.@��t�Kuo�	=p6���-G���q0cyM�<߭y�,.L���q0V�>f���y`f�v��|��|ͬ�cYv��XS�Ü�e�<����y��1ʳy[�y��y�eS]�<�9Fy����x��}��K�, ʱɓG2n(]������y7�c��MV�M%KU걗����,͑z9�/l.o(I&��1�y�2߿Qɪr4_�eIR�y���^P�.WN�
[�aY�e��[�qY��/�JX��,qY���8�E'Iγ�Ј�c���,i�r����R�c5�����]�4u9yq¯\#����8��Β�.���&ro�H�/�<�~�K��2� ��Py���E�� �K��64�J�k&ԙZ�a\��|��S�j&�e�Ӷr�� ʸt�&Omh�>������6g.ӥ�Sl��/��Z5am�����4ij��O庮�Qo����4Yj#�
���`I��Y+|M�x��ʞ�{_×3M��Y}��@4X���͉j_Cw40M����T:"��*)����։;M����PІ^�%�:��Z�L��6�V�����3Gi�y'��\�=S��	���$������2�B�����D������S� �#�z��j@�1M����EA���S�T� �IS\T� �u&�� ��4yj'@WQ�3Qm`�� ��Sx�7�:��j/@71M���4�/���LTx��7�i��^�q�㙧6���ʇ��4ij���|��㙨6��W�i��^���㙨6���ե�Sx
��g���P$8��� ��S�3Qm�(�i��^����K��68\�0Ӥ�ΡW�۷.a������� �S�0Qm��0:����Ѭ��K��6����4yj3>��~���l��r��߉b�ꐩ�VYO��߷yi�k-�}Nm�ס̍"ʨ�'� Y���H���<E�e�����(}?%ov#��`�����{,yʲ���qG�7�e?(o�c�S�����;ʽ��,�hd�`��z|j&*�Q�*L��ͯwѧN`���U=�4�G��]����0G�k�`��(�K?� �H�L����w�`������)���?u��}�`�房�şZy
3���z0i
3���]��0G��{0y
s�_��OM�D�9�/Ӄ�S�#�r��%*��V<�<�9����O��D�9��ă�S���şz}y
���7�`�f�ow�F_���o݃�S�#������/!QY�����ʩ�QQ�����S�/OY��kqX���ޅ��}y�r�_Ń�S�#�z~��e)�4�Ճ�R)G��z����S�#��=�<�9¯��O�<�9ʯӃ�S�#�z�~n��)��~+L���7��S�/Oa���x0y
s�ߨ�O�4�9�1��,&Ma*������<�9�o݃�S�#�vn��)��L���7��S�/Oa������)��N�����S�#�]<�<�9������4�9�1o]=�4�9�1o������SL�w&Oa�����s�/Oa������)��~n��)��Q<�<�9�?��O�<�9�?ă�S�#������/��e9�$o㮗�&��r�rt�e��;*
�ѩ8���Q�1=�<�9j9�\u����,L�����$�.Y�������)̙�x���|��a9j9�(5��|�����L�����W��R�����`���夾25�����*L���\t��Ky
s�r���0gu��(5���a����4�9C�2p����0G�W�`����irj,�)��5=�<�A�%��R��<Bd�G��2H�)�Y��R�� F��G��4ȑ)t���KiJ���s�C��4H�;w�{��<�A�L�M�� K�P�LyJ� �B�yk1���I�kw�-���z��y�ݕ��LyJ� �;L��@9)��Mij�`�6�IT�G
Űq�)Oq����F4����(6n8�)��(��h2f��ظ���8p��F4��;@�l�E�S�G�x4��C@�l�IKSĲU�e#�D�A2[�h6��)e�M���P<w�����و&Sq`(���jy�C@mD��80�Ɲ�<Ł!��6��T�GF;�nSw-Mq�V)��him��ڸ���80��F4��C��m�b�Sm��d*�q�-Oq`(��h2���۸͖�80��F4��C@n�6LS�V���G��8)n�bܸqx�u�]���j40��F4���[.<� %�q�0Om�(ʍh�v���^:�y�?@qn���:�����:�S�tc�DՁ!�X���a�� ׭R���N}\�F=n�,��1N���P��K�0Ou`
(�qU��R�^ڇy�W@9o���:p���?�S�
{c�DՁ+����b�� �R���2�*���t�T�q�kwqU����^Z�y�W@�o���:p���C�S�(���t���@F)6�q}� ����m�4�i�ѡ.N�� 
�R�K�-Ou ��8���,��q�-Ou �
�8���\���[��`qM�p���:pǭ�>���8�ᇷ��B�c��.��K��wp�5JmC�*2�<m~�ߴ�C\�����*�v���.�}�j��3&HC�R�,��m�,߯�0�JiJ�#e��3�o�S�������:HT���8y��P�J�J/۸y��I�J���:0�������:0���8���I�J/۸y�sL�P��$�� N��q�TgG\�D�Y�i�6n�� fI(f�q�T�
    R���3�4�x��W��Z��FA��x_�^.����wQ|&���w�g��AtĽ->Qup�_Ľc=��u�Oou�?=�tӫ=]5�et�Ϻ�$��	��|_��_ m/N�t�O5�����վ]�����q�թ ~xk�VZ�-�.}��(�s)����~��\ڂ�b�]�`�*�IX�	���]����C��OA��uiX����T�>����������O��,/%A�����$��
V�X��d�4�p�SԽ�7�i8�)�^Ǜ��*�q���橎���1N�IT�M�9N�IT�M�{1o��T��������^�����/�Q�/��?6m&����x�"�]
��o��Ҭz���f��my4��%�7�1hv]�jqq��>�:4�N3�%�o��/�B�H9,�lZ{�zp��3���.�uq�^��M�8{����^�����h_c&�9�)��I$���L'����9�x8�4��iw��.yj�d�=���eI�9z4�5'���ќ�.N"��vp�Ñ:�7��	m��I$�z4�M'���Y����dZ��P-.N	�#�J:�{5rI�	UqYI�	���$�P;���$�P;���$�P9��D��4}����sAr?$���Z�T�tYhGw$`�u@���O�'���勼ٷ"� �@�Qk��#��g{;���gJ�6���Z�=�q�Lo�7�P ��^���Ҵ���g�&a�Ш�E�vW�-*����pq���Y#�tq�����uy8���v��V\�<kd;kd���g]�<�����5��˒h���ٚ��h������I�F�g�l��$Z#k?��������l�8�A?��������ly8�A?��'�#��tr&WBC0�!����k�#4��Gh��]��T���/�7�*/����<�������������>>Z���?���.�8V�7�P���8N��G���ct�94�|�8Ơ�&�/����$����(M"GF�����tt��R�GmFsq��<r3��I�7���0'��̳���I���8B4\�D:�����$R�y�cy8����Y\�<�`G0�`�7Y}�Y�:�`�˒��#�S]�D���N�p2I�::���HBב�9\�D������dҜu�ҋ���>���-m弥��,y��Vκm5'Ϻ����.NѱrDg���Ht��Y���#:V�����+gݶ���g�f���I��V���I�p����B�`�U�w���*���0�LAE Di.O"WP� Q��IdN6��1�'�/8����<��2�j.O"g�T�s����c����U��u)E�U-˫N&��ȹ��+�IT�G����l�3���}���<��(��&��y�]Q��P"�󈻢���DnG�v��@������%�;�S����O�>P�c�P���$L�(�K�a�`��+��%�G &��I�\��K �D.��%�J�\��K�er	����.���$}Va�@@�\�>��K �<.a��c�S��˞f�&=@c�q��|_�}�?uks��	.��ga���۟{�2���������$����g��1�d�٬���!�D�G��l(��A>kml(��ABkml�@��2Zkc�C@����4�?��� v�6�?����gkc�p��=[�]�q	���>[k�Wɗ�n����?�B��% ��R�P"�`��C�J�B[)���2���UJ�{J��W)w�(�K@�^���D.�{���(�K@�^����<.�{��%�z�|M��W�]��q	���`���*e[���m��y���%�4Z@�n"o��h��ؽ���HYNwqU�g�a։����9�l�<�1�ܳ�q�����S_���S������ç�N�ץ�8�����p�SOT��/��S�:P�{�z��t\�P����Tg ����'�������. ��Վ���)ug਋��:���w�M��L����-��0m��HwqZ��I\�q`r�nrd��)��#��IT���ir���:09��8�����&Gz�F�{�&LN'Qu`r�����kf�-x��t-h��h��M����To6+.N����fյ����7�����:��:���}'U[T�#.J���"p��4yƦq;��䙙R��G�h`J��]�D�R�_�ǿ�\%�k��Tj��/J4���Tj��/J4�50��y���i�7����_�g�k�+�N���������ϴ�<���u[��iV{�޷��R@P�s\����X�o��+>�����������]��y���%�/)����V
���բ��z1t�@��ϛ�oE�A0\��$[�w� �t	���?�8�V�\��$G}ղ�������oz�n+�Z�u��V�����V���~GW-��OV����VKY}���/���ݎA�����CS�4k?���w$9P절�"ۊ�4��4�F�Ij3��4c?l-�<4�Ҝ��Y��{4�*=���3|��;d���g�8]/�)p���;��oe[9q��,g������mZqq�x�v�M�{�as;�tަo��E��m��6��4Y�͚9i�r���O}�|9ima ��;�����&H�}�t�]�۴d�ma��u'Qu0A�����#�SVsVm�8���9�v��j��̔3�sVZ\�D����V��\���#⟆,�;���,����3���x����I�G��tq�$�#�y8�������8i�����?���D��D�?e�3K��KD�S�?�$�D�?��3N��K��S�?�dr���a풔�n�!8���&W�	�Z�l��mNe��ճ����ɳ��gKWiKw����M�eKWϖ����gKWϖ�6�&˖�9�jU�&O�ZO�Zͥ�Ӯ�Ӯ���djW�iW��q���wu�8y��v̀.'��c��8ỳ3`4�vZc�4�����X�0�Y��@^V�1q������~ ,���.�TaC�H�u�KhT�~$Ԇ�sN�lw��9j��i�XB��	����d	�s$��ꕄ�Hh�����K#��Hh������~$����p�H�88�����4gI=̣�f��Ks���.M;0�å���q�u`��9���c���3M/0������4i��<�9y�x<O�f��y�f�1���yV�S]�D+�y�s���G@���}�<
��������u$tN'������Ԅ�GD���j�I���,�7��U��LdYP��w��%�#X�,nQNG��#Xܣ��$r�8��Mj����q��Ԅ����ǃ�]j�I�j9�`q������r��.5�q�<V�MM<Y,A-�X)wO0E.{����	jA�J&�)�1+��<i\A-Z)���{i�y���m��}�<Ơ"m��'�3��[)��IdieW�FK��ʨaM�k���ZW����+��2bٿ��4$���G~IIC�@H9��q엄4$t�3�g����ā�rh�_�ш8��2-#�����!q �Z�8�K"G��|��K��8��'���K��@x��^������#��G��,y����NG p�!�����p�)�qG cJ8iA�#�1���q����1���� ��R��NG���J��/8Yb?+�~�+R�G�s8�~V�$�<��=B�y
�p�8�G���I�A�v�I�A�v�I����\�'�#P8�ƃ턓� 5�rl�qH���8YRc*���sk;�̘ʡ1� y� c*G��X�}\o����,i\ �b*���X�X d�T������TN�yf�#�H��scI������scI#�ȇ�scɢ����3�|"�$�C)~7-Q�RŴ�O�&R�"|�R���>R)}�'���#��G^pҼ�>R)}�'�+�#��`4e��xEW����s�w�<�3����cф�d}f��F�F����OS�y���ʓ�m�q燹@�2�����>P�{?���>P��r��æ�����Ö�(�}�2ܜS|�4���ȇ߹�L���1�o�Z�"��h~�c��̱QP �  ��J�s#台p.P"�3`z:�JdzLOg�sJdzjyLJ�X]V�fo�`R��	'O\6&��Ǣn�;g�;���SQw�<wg`NZ^�1�i�ܝ�1iᙨ;M��30%-�A��4y������}ޮ��sw���5����:��;����Q�������kr�����⡤��-�Z����`y^��ҕ���6I6�7���4iF���])&�i�!%�RL6Ӥ'BJv��l��ӶFJv��l�IӵFJv��l�IӴFJv��l�I�jƇ���?<�����9�6�f7��w�M�_�����(�){q>��B�g��o��i���O�Y��<K�U�J���^1�n>U;�Қ�]"�O��l"�ڛ�,!��H��@�]�ޮ�����"� .�l��`�`z����ߊ`�`�Ү�%X`/= � ��c~#������A~U�0���>ߚ�V���� wK�@�.�9�V&$y�%y�����Oոo�	=����Q|�@ŷ"����m�>���1]����M��X�a�� �<�K��֯��QyV�`?��]� �S\��$��?|+�l.�|_E��O� ��K& ��x�z���<�֠d:p�m���_"ҁ�4����t�D�Iӿ,�t�D��sN��^L縷��y��K?o��qo��e\s�WA�7�I��^N���s�ᤉQ/����9�펓'E����[�k�᤹`�`�d��5�p�d���׹�'�Ir�J���x�k|F�s���and��j��9έ��*�4o�s��G��dk���<]�4�@�I S'�(U:-�e�<���2,����B/��D����˽�$� =��r��3�Yp��{�H�m(\���=�h
Wx�W��ل���o~����,G      x      x������ � �      z      x������ � �      |   @   x�sv
�t�tvq�q��28�S�J2�2�KR�R�+�������֩����� b;      }      x������ � �      ~      x������ � �         �   x�3�LL����T1JR14P�)�3ήJKO��0Hs�rK1IM	u+�0�)5O���Huqq�-��v-t�J�+�H�t� &9��ML�8K8�� 9]|=� �8������������'W� H%�      �      x������ � �     