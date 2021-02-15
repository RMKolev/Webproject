<?php
	class UserTemplate
	{
		public $username;
		public $password;
		public $facebook;
		public $bgg;
		
		public function __construct(array $subjectData) 
		{
			$this->username = isset($subjectData['username'])?$subjectData['username'] : null;
			$this->password = isset($subjectData['password'])?$subjectData['password'] : null;
			$this->facebook = isset($subjectData['facebook'])?$subjectData['facebook'] : null;
			$this->bgg = isset($subjectData['boardgamegeek'])?$subjectData['boardgamegeek'] : null;
		}
		
		public function toArray(){
				return [
				'username' => $this->username,
				'password' => $this->password,
				'boardgamegeek' => $this->bgg,
				'facebook' => $this->facebook,
				];
		}
		
	}

	class OfferTemplate 
	{
		public $title;
		public $userID;
		public $price;
		public $quality;
		public $offertype;
		public $bgglink;
		public $comments;
		public $id;
		
		public function __construct(array $subjectData) 
		{
			$this->title = isset($subjectData['title'])?$subjectData['title'] : null;
			$this->userID = isset($subjectData['userID'])?$subjectData['userID'] : null;
			$this->price = isset($subjectData['price'])?$subjectData['price'] : null;
			$this->quality = isset($subjectData['quality'])?$subjectData['quality'] : null;
			$this->offertype = isset($subjectData['offertype'])?$subjectData['offertype'] : null;
			$this->bgglink = isset($subjectData['bgglink'])?$subjectData['bgglink'] : null;
			$this->comments = isset($subjectData['comments'])?$subjectData['comments'] : null;
		}
		
		public function toArray(){
			return [
				'title' => $this->title,
				'userID' => $this->userID,
				'price' => $this->price,
				'quality' => $this->quality,
				'offertype' => $this->offertype,
				'bgglink' => $this->bgglink ,
				'comments' => $this->comments,
			];
		}
	}

	class Db
	{
		private $connection;

		public function __construct()
		{
			$config = include('config.php');
			
			$dbhost = $config['db_host'];
			$dbName = $config['db_name'];
			$userName = $config['db_username'];
			$userPassword = $config['db_password'];
		
			$this->connection = new PDO("mysql:host=$dbhost;dbname=$dbName", $userName, $userPassword,
			[
				PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
				PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			]);
		}
			public function getConnection()
			{
					return $this->connection;
			}

			public function getUser($userName, $password) 
			{
				$query = $this->getConnection()->prepare("SELECT * from `users` where username = ?");

				$query->execute([$userName]);
				$user = $query->fetch();
				
				if($user && $query && password_verify($password,$user['password'])){
					return $user['id'];
				}
				else
				{
					return -1;
				}
			}
			
			public function getUserDetails($id)
			{
				$query = $this->getConnection()->prepare("SELECT username,boardgamegeek,facebook from `users` where id=?");
				$result = $query->execute([$id]);
				if($result){
					$result = $query->fetch(PDO::FETCH_ASSOC);
					return $result;
				}
				
				return null;
			}
			
			public function getUsernameAndID($userId)
			{
				$query = $this->getConnection()->prepare("SELECT username,id  from `users` where id = ?");
				$result = $query->execute([$userId]);
				if($result){
					$result = $query->fetch(PDO::FETCH_ASSOC);
				}
				
				return $result;
				
			}
			public function registerUser($userTemplate)
			{
				$query = $this->getConnection()->prepare("SELECT * from `users` where username = ?");
				$result = $query->execute([$userTemplate->username]);
				
				$count = $query->rowCount();
				if($count == 0)
				{
					$userTemplate->password = password_hash($userTemplate->password,PASSWORD_DEFAULT);
					$registerQuery = $this->getConnection()->prepare("INSERT INTO `users` (username,password,facebook,boardgamegeek) VALUES (:username,:password,:facebook,:boardgamegeek);");
					$result = $registerQuery->execute($userTemplate->toArray());
					return $result;
				}
				else
				{
					return false;
				}

			}
			
			public function registerOffer($request)
			{
				$query = $this->getConnection()->prepare("INSERT INTO `offers` (title,quality,offertype,price,comment,userid,link) 
				VALUES (:title,:quality,:offertype,:price,:comments,:userID,:bgglink)");
				$result = $query->execute($request->toArray());
				
				if($result === false)
				{
					die(json_encode($request->errorInfo()));
				}
			}
			public function getAllOffers()
			{
				$query = $this->getConnection()->prepare("SELECT * from `offers`");
				$result = $query->execute();
				$rows = $query->fetchAll(PDO::FETCH_ASSOC);
				
				return $rows;
			}
			public function getOffer($id)
			{
				$query = $this->getConnection()->prepare("SELECT * FROM OFFERS where id = ?");

				$query->execute([$id]);
				$result = $query->fetch(PDO::FETCH_ASSOC);
				if($result)
				{
					return $result;
				}
				else{
					return null;
				}
			}
			
			public function getUserOffers($userId)
			{
				$query = $this->getConnection()->prepare("SELECT * FROM OFFERS where userid = ?");

				$query->execute([$userId]);
				$result = $query->fetchAll(PDO::FETCH_ASSOC);
				if($result)
				{
					return $result;
				}
				else
				{
					return null;
				}
			}
			
			public function deleteOffer($offerID,$userID)
			{
				$result = $this->getOffer($offerID);
				if (!$result)
				{
					return -1; //Offer was not found;
				}
				
				if($result['userid'] != $userID)
				{
					return -2; //Offer was not from this user;
				}
				
				$query = $this->getConnection()->prepare("DELETE FROM `offers` WHERE id = ?");
				$success = $query->execute([$offerID]);
				
				return $success;
				
			}
	}





?>