
<?php
/**
 * PasswordCrypt
 * Class to Encrypt User passwords
 * 
 *
 * @author Lujja Henry Bbosa
 */

class PasswordCrypt
{
	public static $first ='$5a';

	public static $second = '$10';

    
    /**
     * randomize
     * used to generate string of random characters using sha1 and mt_rand
     * @return String of random characters generated
     */

	public static function randomize()
	{
		return substr(sha1(mt_rand()), 0, 22);
	}


	/**
     * password_hash
     * used to generate hash for user input password
     * @param String $password User input password
     * @return Crypt object of the encrypted password
     */

	public static function password_hash($password) {
 
        return crypt($password, self::$first .
                self::$second.
                '$' . self::randomize());
    }



     /**
     * Compare_pass
     * used to compare hashed password with user input for then to login
     * @param String $hash for the hashed password from db
     * @param String $password User input password
     * @return boolean indicating if they are the same
     */

   public static function compare_pass($hash, $password) {
        $old_hash = substr($hash, 0, 29);
        $new_hash = crypt($password, $old_hash);
        return ($hash == $new_hash);
    }
}
?>