PGDMP         9        
        |            cemifydb    15.4    15.4 K    v           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            w           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            x           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            y           1262    94359    cemifydb    DATABASE     �   CREATE DATABASE cemifydb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE cemifydb;
                postgres    false                        2615    94360    dbo    SCHEMA        CREATE SCHEMA dbo;
    DROP SCHEMA dbo;
                postgres    false            �            1255    94370    usp_reset() 	   PROCEDURE     �  CREATE PROCEDURE dbo.usp_reset()
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
            dbo          postgres    false    221    6            �            1259    94397    Lot    TABLE     '  CREATE TABLE dbo."Lot" (
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
            dbo          postgres    false    6    225            �            1259    94413    Reservation    TABLE     U  CREATE TABLE dbo."Reservation" (
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
            dbo          postgres    false    6    227            �            1259    94421    SystemConfig    TABLE     r   CREATE TABLE dbo."SystemConfig" (
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
       dbo         heap    postgres    false    6            �            1259    94434    Users    TABLE     W  CREATE TABLE dbo."Users" (
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
       dbo         heap    postgres    false    6            �            1259    94442    Users_UserId_seq    SEQUENCE     �   ALTER TABLE dbo."Users" ALTER COLUMN "UserId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."Users_UserId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    232    6            �            1259    94443 	   WorkOrder    TABLE     �  CREATE TABLE dbo."WorkOrder" (
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
       dbo         heap    postgres    false    6            �            1259    94450    WorkOrder_WorkOrderId_seq    SEQUENCE     �   ALTER TABLE dbo."WorkOrder" ALTER COLUMN "WorkOrderId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME dbo."WorkOrder_WorkOrderId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            dbo          postgres    false    6    234            _          0    94371    Access 
   TABLE DATA           Z   COPY dbo."Access" ("AccessId", "Name", "AccessPages", "Active", "AccessCode") FROM stdin;
    dbo          postgres    false    215   k       a          0    94379    Burial 
   TABLE DATA           �   COPY dbo."Burial" ("BurialId", "BurialCode", "FullName", "DateOfBirth", "DateOfDeath", "DateOfBurial", "FamilyContactPerson", "FamilyContactNumber", "FromReservation", "ReservationId", "LotId", "Active", "WorkOrderId") FROM stdin;
    dbo          postgres    false    217   �k       c          0    94387    Files 
   TABLE DATA           ;   COPY dbo."Files" ("FileId", "FileName", "Url") FROM stdin;
    dbo          postgres    false    219   �k       e          0    94393    GatewayConnectedUsers 
   TABLE DATA           J   COPY dbo."GatewayConnectedUsers" ("Id", "SocketId", "UserId") FROM stdin;
    dbo          postgres    false    221   	l       g          0    94397    Lot 
   TABLE DATA           W   COPY dbo."Lot" ("LotId", "LotCode", "Block", "Level", "MapData", "Status") FROM stdin;
    dbo          postgres    false    223   &l       i          0    94405    Notifications 
   TABLE DATA           �   COPY dbo."Notifications" ("NotificationId", "Title", "Description", "Type", "ReferenceId", "IsRead", "UserId", "Date") FROM stdin;
    dbo          postgres    false    225   ��       k          0    94413    Reservation 
   TABLE DATA           �   COPY dbo."Reservation" ("ReservationId", "ReservationCode", "UserId", "LotId", "DateTime", "BurialName", "DateOfBirth", "DateOfDeath", "DateOfBurial", "FamilyContactPerson", "FamilyContactNumber", "Status", "Active") FROM stdin;
    dbo          postgres    false    227   ��       m          0    94421    SystemConfig 
   TABLE DATA           5   COPY dbo."SystemConfig" ("Key", "Value") FROM stdin;
    dbo          postgres    false    229   Ҝ       n          0    94426    UserOneSignalSubscription 
   TABLE DATA           N   COPY dbo."UserOneSignalSubscription" ("UserId", "SubscriptionID") FROM stdin;
    dbo          postgres    false    230   �       o          0    94431    UserProfilePic 
   TABLE DATA           ;   COPY dbo."UserProfilePic" ("UserId", "FileId") FROM stdin;
    dbo          postgres    false    231   �       p          0    94434    Users 
   TABLE DATA           �   COPY dbo."Users" ("UserId", "UserName", "Password", "FullName", "Gender", "BirthDate", "MobileNumber", "AccessGranted", "AccessId", "Active", "UserCode", "Address", "UserType") FROM stdin;
    dbo          postgres    false    232   )�       r          0    94443 	   WorkOrder 
   TABLE DATA           �   COPY dbo."WorkOrder" ("WorkOrderId", "WorkOrderCode", "AssignedStaffUserId", "DateTargetCompletion", "Title", "Description", "Status", "Active") FROM stdin;
    dbo          postgres    false    234   ��       z           0    0    Access_AccessId_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('dbo."Access_AccessId_seq"', 1, true);
          dbo          postgres    false    216            {           0    0    Burial_BurialId_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('dbo."Burial_BurialId_seq"', 1, false);
          dbo          postgres    false    218            |           0    0    Files_FileId_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('dbo."Files_FileId_seq"', 1, false);
          dbo          postgres    false    220            }           0    0    GatewayConnectedUsers_Id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('dbo."GatewayConnectedUsers_Id_seq"', 1, false);
          dbo          postgres    false    222            ~           0    0    Lot_LotId_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('dbo."Lot_LotId_seq"', 1183, true);
          dbo          postgres    false    224                       0    0     Notifications_NotificationId_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('dbo."Notifications_NotificationId_seq"', 1, false);
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
       dbo          postgres    false    223    217    3252            �           2606    94483    Burial fk_Burial_Reservation    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Burial"
    ADD CONSTRAINT "fk_Burial_Reservation" FOREIGN KEY ("ReservationId") REFERENCES dbo."Reservation"("ReservationId");
 G   ALTER TABLE ONLY dbo."Burial" DROP CONSTRAINT "fk_Burial_Reservation";
       dbo          postgres    false    3256    227    217            �           2606    94488    Burial fk_Burial_WorkOrder    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Burial"
    ADD CONSTRAINT "fk_Burial_WorkOrder" FOREIGN KEY ("WorkOrderId") REFERENCES dbo."WorkOrder"("WorkOrderId") NOT VALID;
 E   ALTER TABLE ONLY dbo."Burial" DROP CONSTRAINT "fk_Burial_WorkOrder";
       dbo          postgres    false    217    3268    234            �           2606    94493 3   GatewayConnectedUsers fk_GatewayConnectedUsers_User    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."GatewayConnectedUsers"
    ADD CONSTRAINT "fk_GatewayConnectedUsers_User" FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId");
 ^   ALTER TABLE ONLY dbo."GatewayConnectedUsers" DROP CONSTRAINT "fk_GatewayConnectedUsers_User";
       dbo          postgres    false    3264    221    232            �           2606    94498    Reservation fk_Reservation_Lot    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Reservation"
    ADD CONSTRAINT "fk_Reservation_Lot" FOREIGN KEY ("LotId") REFERENCES dbo."Lot"("LotId");
 I   ALTER TABLE ONLY dbo."Reservation" DROP CONSTRAINT "fk_Reservation_Lot";
       dbo          postgres    false    227    3252    223            �           2606    94503    Reservation fk_Reservation_User    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Reservation"
    ADD CONSTRAINT "fk_Reservation_User" FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId");
 J   ALTER TABLE ONLY dbo."Reservation" DROP CONSTRAINT "fk_Reservation_User";
       dbo          postgres    false    227    3264    232            �           2606    94508 ;   UserOneSignalSubscription fk_UserOneSignalSubscription_User    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."UserOneSignalSubscription"
    ADD CONSTRAINT "fk_UserOneSignalSubscription_User" FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId");
 f   ALTER TABLE ONLY dbo."UserOneSignalSubscription" DROP CONSTRAINT "fk_UserOneSignalSubscription_User";
       dbo          postgres    false    230    232    3264            �           2606    94513    Users fk_User_Access    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Users"
    ADD CONSTRAINT "fk_User_Access" FOREIGN KEY ("AccessId") REFERENCES dbo."Access"("AccessId") NOT VALID;
 ?   ALTER TABLE ONLY dbo."Users" DROP CONSTRAINT "fk_User_Access";
       dbo          postgres    false    232    3243    215            �           2606    94518 #   WorkOrder fk_WorkOrder_AssignedUser    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."WorkOrder"
    ADD CONSTRAINT "fk_WorkOrder_AssignedUser" FOREIGN KEY ("AssignedStaffUserId") REFERENCES dbo."Users"("UserId");
 N   ALTER TABLE ONLY dbo."WorkOrder" DROP CONSTRAINT "fk_WorkOrder_AssignedUser";
       dbo          postgres    false    232    3264    234            �           2606    94523 #   Notifications fk_notifications_user    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."Notifications"
    ADD CONSTRAINT fk_notifications_user FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId") NOT VALID;
 L   ALTER TABLE ONLY dbo."Notifications" DROP CONSTRAINT fk_notifications_user;
       dbo          postgres    false    3264    232    225            �           2606    94528 0   UserProfilePic fk_userprofilepic_files_354100302    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."UserProfilePic"
    ADD CONSTRAINT fk_userprofilepic_files_354100302 FOREIGN KEY ("FileId") REFERENCES dbo."Files"("FileId");
 Y   ALTER TABLE ONLY dbo."UserProfilePic" DROP CONSTRAINT fk_userprofilepic_files_354100302;
       dbo          postgres    false    231    3247    219            �           2606    94533 &   UserProfilePic fk_userprofilepic_users    FK CONSTRAINT     �   ALTER TABLE ONLY dbo."UserProfilePic"
    ADD CONSTRAINT fk_userprofilepic_users FOREIGN KEY ("UserId") REFERENCES dbo."Users"("UserId");
 O   ALTER TABLE ONLY dbo."UserProfilePic" DROP CONSTRAINT fk_userprofilepic_users;
       dbo          postgres    false    232    3264    231            _   �   x�3�tL���㌎�S �jCAA� 1=U�JA�7�@II�,3�(^RT��,�����V�E�(3=��(���g�SiQfb��T
.I,)-V"����Ԣ�Ē��<j9����(��!"��_���_��Z40A
�b�Ƹcrrj1��0b9K8@��+F��� �8�]      a      x������ � �      c      x������ � �      e      x������ � �      g      x�՝M�%Ǖ�׭_!ped�2��w�P��ʛ<c��#C�/���N�W�[Q�!)M�'�M�}��xoE�ʬ�r.���ϫ|�ݧ�����������7��c�o���7����k�/��_�˟~�P�a���_�������?���Q�G��?�����?�����O��?�������1��F-v^�Կ��c�r�{���=�_�?����?���Qv�6�Y��\���o��o��������~u}��?�R?}��Rϣο���Q�"���:~�w��G+���.(+�/?h��l���V�KޕP�1��+.���o�8wZ�	�%�LK` �!���k�I�A0"�~֣��3$��xޔ�L����&�����\��Q�4܋jx/���%��������Q�~�E5�ͳy=��^T�{Ѭ��+nE5�M� ҆��[QoE��"�JK����!��E�ic�� (����#m�0�-���E�i��04�u��
Ӎ������z�1�q�!A�����m������n��VH�z�1r�!A���`�v����C�\�䴷�?���<Ӧ�?�Џ��E^y5�%[h�W�8vZ;�d-9���a�Zr�!�Ò-���C~�%[hɩ��G�Бs���CG�=�8r9��?`�=���C��%�Вs���ɒ�8�)�~�{x����?�#$H=��q�!A�!����r���wH�z�0�q����	C%$H=�O�!A�!G� r�~<B?�=�OX�-9��?a�#���C��%�Вs��<BK�=�OX�-9��?��3t��C��#�Бs��<CG�=�/X�-9���`�3���C��%ϻ%��?�ه�?�#���C������x�� �����sG���C^gH�z��0�UB��C��!���7y�� ����"��C���Џs���BK�=�oX�
-9���a�+���C��%�Вs���CK�<����CGN=����CGN=����CGN=�_�Q���zȟ',y���zȟ',y�%�k$���	;�3���#�<��{E �'�y�� 2��t/n� ���g9P"����, 5�<�O�r� Z�y��^�pX�x��^�p]�?�h?����\8�d?�����8�`?�����8�\?�����8�X?��DF�z��F\"#N=ԣ���ȇs��h&j%���#=��Z�|8�D�^�V"#�=У���Ȉs��h%j�J�V?�R�QIԨ��/?�D�J�F�DL�z��0�z��g�'�%"�=�7xq�!Aꩾ��k	R����jT����zTs5��b�̃=��5s@���\��~�{�G5W��%��Q��jhɹ�{Ts�Zr���\����{�G5Wk�%������Z�ȹ|�s�:r�	�\����{�G9Wk�%��Q��Zhɹ�|�s5*���Ŕ�0䣙�Q3_~�!�\���� ���f�F�\L�z�G5W�j."�=䣚�Q5��Q�ը��	R���jT����|Ts5��b��C>��5s@�!�\�B?�=䣚�Yhɹ�|Ts�Zr�!�\����{�G5W�%��Q��zhɩ�|4s�:r�!�\����{�G9W�#��Q��zhɹ�|�s�Zr�!�\�ʹv/GQ�؛h�j��ŗ�z�G3W�f.&H=䣙�Q3��Q�ը��r���jT����|Ts5��b��C>��Us1A�!�\���� �f�F�\�{�G3W���Q��fhɹ�|Ts�Zr�!�\m���{�G5W��%��Q��fhɩ�|4s�:r�!�\m���{�G9W��#��Q��fhɹ�|�s�Zr�!�\�ʹ����S�h�j��ŗ�z�G3W�f.&H=䣙�Q3��Q�ը��r���jT����|Ts5��b��C>��Us1A�!�\���� �f�F�\�{�G3Wۡ�����-9���P��vhɩ���j��CKN=�/Ts�Zr�!����В3��\m���z�_h�j;t��C�B=Wۡ#�����-9���P�eghɩ����.���r�y�"0�/tt=�?�P�eT��@�<�/�t�t=2�=]F=]��z�_h�2j�z d�������g���.���B�a��˨�끐x�_(�2*�b����Be��ؙs��h���s��]Vbs�=��JlιG~twY��9�̏�.+�9��Q�e%���S?*���ޜ{�G���؛s��(��s��-^Vcs�=����*���^�r��%^Vٙ��SO�h���L�'�xYeg&�ԓ?����3�rO�h���L�'TyYek&�ԓ?����5B��e^�ؚ	!��2/k��w�ܓ?ڼ��Μ{�G���؜sO�(���s���^�bs�=����Zlι'tzY��9��N/k�7����e-��ܓ?���bo�=����,6�ܓ?���bs�=���ˌ����9���f/3vf��ԓ?���ؙ	!��n/3vfBH=���ˌ����{�G��[3!�����e��L�'|Ygk&�ԓ?���5B��_�ٙ��'T|Y��9�䏒/�9����e=6�ܓ?j����{�Gϗ�؜sO�(���s��E_�co�=����F�͹'�}و�9�䏺/�9����e#6�ܓ?
��
�J)�8��䏺/����������e���@H=���˨�끐z�G�Q�#����e���@H=���˨�끐z�G�Q��!���/�گB���_F�_L�{�G��ؙsO�h���s���_6cs�=����flι'�ٌ�9���/��9�����e+��ܓ?�l�ޜ{�G��؛sO�� ��s��%`�bs�=���������'t��bg��O=���;3!����f���RO�����|G�=���6[3!d��7��l�5B���
�6[3!d��7��l�5B����6;� ��Qf;v�ԓ�F��؜SO�}`�csN=�o�َ�9���f;6�ԓ�F%X?cs�<�oT�u�c�̓�F+X�V0F�<�o��unc�̓�F+X�V0BH=�o��unc�̓�F+X�V�r���
L��`�+���3O��`�+�!��Q	ֹ�2O��`�;�!���	ֹ�RO����	��'t�u�c�ԓ?:�:w�1B���`�+�� ��J�Ε`��z�G'X�N0FH=���s'#����	ֹ�RO����	F�'t�u�c�̓?*�:W�1A���`�[�!��V�έ`��z�G+X�V0B�=���s+#����
ֹ�����n�����k9Z����u`�k��������\v�|[�nY/n�5`�˟א���Qֹ�v��kd�|�0��_�*�ue)/��_u^��}�f�j�:�~��g�����s�d�����s�d��y��R߄�\�E��C�`n�j����˾��3߅P�չ� 2߄P�չ� ߃��չ勮?�-5_�k�� ��@(��\�U����G�F��x�l�XO�?��O����wֿ-��q�o�5j���:�����G�G�us'X;�[����ӹ+���u4�=w�����x�)=;��ޟ�u��K���u���s!p�X�~2)��p�s�X��c�Hс���y�����T�e�2���ѐ7����q좍6�)�ҦԱ�QE:�6�Vڔ������Vړ��W���Vڒ���v�Vڑ����6�VڐJ�����Vڏ��W�6�Vڐ� ����Vڏ������Vڎ����v��Zr��ͨ����z����B/ŏkpmGrv�_�x�|+�x)��K�L��V�QbV�Č�^�Q`V���/?���e��˘ ���e��˘ ��e��ˈ ���ee�^��͊��2C3H�bEGwY���~�����Pu$~�����Pq�~R�Q\VV�ǩ�u���Zr�'E�ee����IQGkYY�%�~R�QZVVhɩ�m������{��)>��8�������u�(��������n�������9�Q�%�6���$���G���º9���J?�6���Џfvli.���$�6�#�raŜ����ո�\�g�X3i(,��)"������y�8Ż��[�    -������>"0R�>VQGC���GZ-GY�hH| I�>�}c�9i�����Yh��c\ߵaGo_��*�+��}�(�`�2���!~��&��~!�|�ꢱ��n�����}{}�>l|��y|�oV:w�����$�r%���E	��F����E�C
�S|��K�o����T�܇/�늎V���+���gC�Tl޼ZA�Y�c�p�"|�J��#�k�!���,��,����<JчC ��\F�<�K:�b�h�˹�m\�N6���lz���ھ���O�P§�X��V'C*�Ca|��P'C,�b���d%|���8�ɐH�p���1�8��9s�,S'C�hF)��%I� �'���o���WA��uC[�\�~{]�Q�ׇC�k���Gu�p�ı6����Ɓ���t�G���=|Y�h�uWJ�?��݋�-����;�WO�"	�c��wq:�>(�lSn|����w�Y>v�~l�?�;��8P������K�nV�<}�ȹ�:�ېQ�'�2�y�l{]��_W��,������9��1o�_�1�~���	�.����/�}���8�� �H��:��$�8I��4_x�z�TG���(�Iڍ����d.#�9�E(*�t'�w߰*x�r�/#BQ�=��M�[��gQ��ˊPTDq�/w�����%��+�	�T7�zF(�(C�č�ލ�x��Tŝ�֐EE��ڢiKG��j!��,n��G3��,G�T:
��1��y�ߡ8��A �����@*��ߡ8��9 L���꡷��+�rw��[g��A��T=�����⹷����,̓o;CY�'�V�G:�x�m5dQ�œok�CY<�6YTd���z�BG��6BY���D�f`A�☕�,n�mE,cK�-��-��E_1Y�-�ΈEEs�7z�����!]��02¸�=�Z��[Qw}�FF�}{>�(���=G�wa���f}��W�ō�V�"#��Ѭ_��~ԥ���3�Q���w��⧬Ea��{ad�q��4��q\��0n��Ba��;ml㽈IH��>Ba��;mn)��wWM���Ba�����{����ߘ��?�FE���?J�d���}<YY��G�X������Ž��ђ�.n��"]��G�-		��VF���{��ѳ%!e���
at�q�;z����t�g#��t��%x�$$������.���E����q����(��?{�|IH��9Be���0	)��?W������[nO�t�Y����o���(���W�1	)�`�FGO �EϘ����,��Q�����O�̻h�0x�r�(�����P�}�#�����Ώ�K�TAyŊPdTq�_w�����dd�n��YTt������olA]���s��;��.����m=�߸���M�w]��7��;�ǹ�b�������⮿���S�_��7�V�YdtAo=�혂�R�Wu�Ҩ(SN�W�����0&�����h������c	�L9Qdu��;��6(�:���d��A��9Bm�iu�s@[���V!mPku��FGT[�����cAm^5��c�42�|TY��?��V��W�%�Y2��6�\i�Ώ�5m��Ւht�A�f�^�{���6�Tn�4:� <
.�qJ������N��� �\�i���A�e��K���m��Fo��җ�4�b��U�>�GcVz$j��/
)� @����r �^Қ��4����4:� P��
i�@�L��r ���ڠ�6(�+���42ڠ��P��
i� @�L���딋{�5B!m��it�A�@Z%�Y�� �FGd�����UB!m� �it�Ah�t[%����Ÿ�N#�J��YW�UB!m�������h�,@ŀ�J(����+it�A�n@Z%�Y���FGd��UB!m�� �it�A��@Z%����J�FF����
�V	��A�����FGdj
�UB!m��*�it�y�I{B� P[ ��h3?��s��ۿ�H8��(̿�f�.���������;�Y��X����PօR�Y*���d_$�Fr_�e��(2���[��HhePH��k�yD,:�\ߓ��r_����|^��,�7�����d�g����n��($�;~���0���n���#�t�/��3�����iPH7�2"a�����iPH���"a�����iPH7�zF0:¸�׻��Ꟑ0�k�#����?-������E02�,7�z7Z��Ϳ�FG7�z7Z��Ϳ�FG7�z7Z��Ϳ���0n��n���'$�����0x�7Z��f��7�`d��n��n���'$����0n������7��geq�o+`Y�O�ϊ�����O�}:���������ow���>]���F0:¸����y�OE�zb��"a���o��O~:¸�ۈ`t�q�7z�O~:¸�ۊ`t�q뷻�󂟎0����`t�q���O~:¸�������i���d���1~�y ##L�>���󂟎0n�}D0:¸����󂟎0n�}E0:¸�wZ�?a�������?hw?-����?j�#�����?/���c�l� FF��g�G~:�`���`t�q�w��?a��Ǌ`t�q�w��?a�������?i���t�q�5�������W�.�.������:�>��o�&�WCq�w�?Y���Xtd��}�-�����?W�#���W�h�OG7�uF0:¸�/Z�?a��W�`t�q�_�ȟ�d��1~�y ##�o���̣?a��׈`t�q�_��O~:��������h���t�q��g�#����W�h�OG7�]#a��7��G~2���?�<���7����т��0n�{D0:¸�o��O~:¸�����nzŏ�t�y�����2h�9iş��t�A��Y#i��s�k~��'#j��`�FF4����Ѳ��4��9GD�#:~NZ���?iP�s��FG����k�M��R u��a��0>rtz�W��=����4H��w�Q�1�z�x	PF�W����8��?���e@q��h��A��?^
�Q�
��FI�����@q���h��A��?^��U�[#%q����e�A�_��?�����xiPG* $%q���u�A �@�Q��z y�PG*$%q���	u�A �2@�Q�u �@K�2��P! ���J�B���Z�#���8�H�:� p3��FIj�Cq��h��A ��@^3���J�FI�	�UCq��:�"q�u�¡?��7=���� PY є�>�r�i��.�Wu�A��@��q�+�:� Pg ���<@����Cu�8�q��A ����ڡ�:(,��8:��y��f���:� P� ���L@-���Cu
�G�q��A*�*���:HT&�8B� P��c�PG�jd!u�
�T�(�Z�
2��:(,�,�XA�Q�u��q��A*�z����:HT0�8B� P��cQG�jd!u�
�h𱈨�RU2��:H�6ȫ�2�o�p� �訃��B���eDu�
�w�q��A*����:��:H�>�8B� P�c!QG�� d!u�
���W�:��8��o>_��U��8������a�<K���g���=��u�}}���f��~�*G�q����Y�^ 5�?\ �.����G�s���$�{�P7Z�o�n[��,S�����B���e@�&��8Z�r�ht�A�h���ǎq��v�q��A����ǎu��{�q��A����ǎu����q��A���ǎu	���q��A&�"�ǎu�DZ���qt�Ai�6�ǎu�
���q��A*�J�ǎu�
���q��A*�^�ǎu<T*&e!u&p�c�1���Nq������C�c@FԓV�'euPPZ����c@G�
���ӀC��u8+�R��6�u�
���p��A*���ǎu�
���q��A*���    ǎu�VZ���qt�A[i���ǎu�
���q��A*��R^I��U����J���ׅjh�L@m�����"����6HTV�XH����JGH$j+},$ʨ���Ju��#�N����X���gt;ڗ�3W;���\��"�k��'�|W�y���Zov+�gY�]�6Z�ծ߉;N9�LC����P��/dj\e�߯���J����Puj�r�q��A�����R��:�5Թ�8B� �P��c)TG�*]e!u�k�t��*�ZW+��2��:h]�Ժ�X
�Q��jWGH��]},�ꨃT@���#�R��>�Bu�A*��U�R���WK�:� P�*���T@ͫ��Puի��WGFC�j��U^
�Q���W	GH�*_},�ꨃT@���#�Rկ>�Bu�A*��U�R���WK�:� P�*���?�������3�RI�x�^��������Y�u�q�2���{���JQle��\�|n!�<?�U���峅4���4�.�{DS�1a�|o.]>����1�ͥ��Ҹ�4�K��+���8�ͥ��Ѵҏj"4˭�q�>Th(	�y��	G�V=	��E��Q��G(T��B�0P=��(���i��G(T�e�8By�z(+�
�A��R"�����$�ꉠ�����^P���ԐE(4O��8B��y"��%�扠�G)4Ou�8B��y"�3�J�A]!�P"h��p�A�D��G'4O�AoG}�H�f�ZY��a���8B��<4q��y"h=�QJ扠�G(�'�6C�D`��
q��y"h;�QJ���G'�'�D�ƇZ��{"��%���Z�#�:vX�#��'��R"�l�8B��{"��%���V�#��'��R"����$���*������Ն'�^C�D0<��%�በ[�#�6�G)O}�8B�`x"�3�J�A_!�P"���p���D0�G'O�A��` �F�P����<0ZD#�ǁa�P��Fh����+#��ӳ���P�Ɗh����$0v@���yF4:9`z��V�xQR+,��,BI`y�-��ˣ��G(,��G8Ja`y�#�J/�G(,�s�8By`y�;�Q
��:C�D�<�{"�ם����D�=��%��`�G(lO�B�D�=��(%��`�G(lOk�8B�`��`�8B�`{"X;�QJ��>C�D�=lJ��'I+����!�N"�'��B�D�OO�B�D�OO�G8B�����qtA?=���$�~z"�+��I�D-юp�A?_�Dg�#	����L��(���"�5t���0B� -��l!�P*@Oa9-��h*,g�x�r�
�9B�`���rΐG(����+��h,,�x������J�G'|�޳���Q�
�����z4B��U\Hͅ �x�.����P>x�R{!)�W}!�>��«��@B�UaH� ���*1�CR
	�1,�c� �I	(2,�SB??~ŴRB{�sJ ���2�R9%�PJ@�a��H(%�аTN	w ���J�R9%�PJ@�a��H(%�ְTN	$�PlX*��;�RJ@�ai�H'%�ܰ4N	��^�qG�ai��F(%��N	$�PqX�J	(9,�S�H)%��4N	$�PtX�J	�:,�S	����)���PwX�S�j<,����+A�<,�y��J	(=,�z� J	�uX��@B)Ň��H)%���P��H(%���P��H(%���P��H(%� �P")�T �@| �� ��)����k�;jK�@4B)E��sJ  ���*��9%�PJ�C9%܁�R�K�@@B)���sJ  ���J��9%�PJ@)b��@J)��epJ  ���b�28%�z�z݈݈epJ ���z�28%�PJ@Cb�H(%�$�N	w ��0_�/sJ  �����28%�PJ@[b�H(%�0�N	w �����29%�NJ������ڟ���>l?b���Gy�;a��<�����z�s���!�<f��l�ګ�J8�L��`�!Am��qE~�q� (w�������/u��_�˿\�'ܳ~)�
��z�O.�A���M��x:��="�g=Z��8;FHP�a?F~)��\���^4A�B��<~|���`�{��79뭨��}���r~��͏���R��n�|�%J	��$�~��9�u�.v^�|�b�+���<������uשv%k���`s�r��׷���U��(5D�W/4�iZHc�0m��XH3�/[ӠYN�C�m�2��4#�q��8�t��\?�N��8+�v������c�+����脁�a�����,��f*a�z�5D�	��@m!�N���4:a�z�=��	��@�Rh�qt�@�0PW������c�0�<�3��	��@�0��1ߟ�hN�0�j������B�0�<4it�@�0�zH����6"�0`ڌqtyh+��	�a��G'��;C�0`���.����J0VC�0`��4:a�<��4:a�<Xity��(���a�f����[1�N�l�8:a�{�g�����N{��������9���^c�18���8�[��6灴8���8�Tiq<��Ή -�'�>b��9d����q|��coZNO}�8����x"�;Ʃ�AZO�qz9Dh<��.���dm�D0<��6��N"��s�G'O㹑�G(O㹓�����'���Jx��I��xn%���$��`<���%��`<��pt��D0�[	o82�`z"�ϭ��"�`z �ϭ��(:y`z�ϭ��4:q`������0��n����F�=���|�{��1���9�[��h��s�w��λw�\n����F�9�����j������r�Y�[�ptg���x��Gh�\�����.7���G�A�;��k��c��-t�;���n����G�D����k�#������Σ��������kĢ��'��[�G'lO����q���D�y���$��`�5I�����5I��D�y��G'����]k�#���j��mkģ	ʉ���	V�G�{(]N�ݜ5��	�D���b�TPNޜ��Ăk�O�ydr��3b�`P�zsΘG'�ޜ+���7�yt����j�<2���v�Q�_[�{u����Ճ�Ex�r���)q��	�q�%��8\��8���AJ���c��C� %b��1���X��Յ�ex�㥽�T������~(��A&�2<�?�	R� p���)i�*�i/G7�DP_͸���΢�ІW*�i'�D�:�RyO;��$���{�	G&��T��N82� �x���;�N"@!^����pd
�J�=�#�P�W�i'�D�B�x~���;{� �x�+�E'�WY>�j'�D�N�¥x�#�P�W��qdZ�
��1�L"@+^�Z<��Ih�+\��82� �x�k�G&��p-�$�����o���t�.�{��h�+\�wc�	�:6�_7xg�Ih�+\�wc�� ��+\�wc���n�{g�1�������8?*�
w��Xdl�w��n,*���B�ws��#��l�w���E��Q~W���#c�(�+�~������:4��8*�|�&��:U
���8�-$ԇ�}��^!�:ll"w
	�acq�OH�ۇ�]BB]��<o�����x��P66�[�t��*cu�>B�����B����3>�2�Pg�Gf�Fel��������B���9��e��xԀ�1G�2�~�΢3G�2�~�pd�hTƖ��������2�M<�Q���x�>�/��L"@el��G'�2�~�pd*c���G%�^��y>��|��e�+�$�J�An��u��^�An�\B�I7(�-Ԁ�4 S   2���B� ���6��-���42�u���|�F&٠ηP�/������e�\�:�B}�L�k
�|��2�F��ǯ~�����,G      i      x������ � �      k      x������ � �      m      x������ � �      n      x������ � �      o      x������ � �      p   �   x�3�LL����T1JR14P�)�3ήJKO��0Hs�rK1IM	u+�0�)5O���Huqq�-��v-t�J�+�H�t� &9�]�\\�8---t�u-8��ML�8K8�� 9�9]|=��b���� [�#�      r      x������ � �     