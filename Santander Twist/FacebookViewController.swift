//
//  FacebookViewController.swift
//  Santander Twist
//
//  Created by Giovanni Aranda on 07/12/17.
//  Copyright © 2017 Hyperiondg. All rights reserved.
//

import UIKit
import FBSDKCoreKit
import FBSDKLoginKit

class FacebookViewController: UIViewController,FBSDKLoginButtonDelegate {
    func loginButtonDidLogOut(_ loginButton: FBSDKLoginButton!) {
        
    }

    var info = ""
    var informacion = ""
    var BUC = ""

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let loginButton = FBSDKLoginButton()
        loginButton.delegate = self
        loginButton.center = view.center
        //read_custom_friendlists,user_about_me,user_birthday,user_education_history,user_friends,user_hometown,user_location,user_relationship_details,user_relationships,user_religion_politics,user_work_history
        loginButton.readPermissions = ["public_profile", "email"]
        view.addSubview(loginButton as! UIView)
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func loginButton(_ loginButton: FBSDKLoginButton!, didCompleteWith result: FBSDKLoginManagerLoginResult!, error: Error!) {
        
        if ((error) != nil)
        {
            // Process error
        }else if result.isCancelled{
        }else{
            
            if result.grantedPermissions.contains("email"){
                returnUserData()
            }
            
        }
    }
    
    func returnUserData(){
        let graphRequest:FBSDKGraphRequest = FBSDKGraphRequest(graphPath: "me", parameters: ["fields":"name,id,email"] )
        graphRequest.start { (connection, result, error) in
            if ((error) != nil)
            {
                print("Error: \(error)")
            }
            else
            {
                
                do{
                    let data:[String: AnyObject] = result as! [String: AnyObject]
                    
                    self.cargarOtro(dato: data)
                }catch{
                    print(error)
                }
            }
        }
    }
    
    func cargarOtro(dato: [String: AnyObject]){
        var dato_ = String(describing: dato)
        dato_ = dato_.addingPercentEncoding(withAllowedCharacters: .urlHostAllowed)!
        let u = "http://panel.santandertwist.com.mx/user/post_login_fb?ios=true&buc=\(self.BUC)&data=\(dato_)"
        print(u)
        let url = URL(string: u)
        let session = URLSession.shared // or let session = URLSession(configuration: URLSessionConfiguration.default)
        let request = NSMutableURLRequest(url: url!)
        /*request.httpMethod = "POST"
        let body = "data=\(dato)"
        request.httpBody = body.data(using: String.Encoding.utf8)*/
        
        let task = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) in
            if let data = data {
                if let stringData = String(data: data, encoding: String.Encoding.utf8) {
                    self.informacion=stringData
                }
                print("Regreso: \(self.informacion)")
                
                do{
                    if let jsonResult = try? JSONSerialization.jsonObject(with: data, options: JSONSerialization.ReadingOptions.mutableContainers){
                        
                        print("JSON: \(jsonResult)")
                        let Array:NSDictionary = jsonResult as! NSDictionary
                        print("Array: \(Array)")
                        
                        DispatchQueue.main.async(execute: {
                            
                            let code = Array["code"] as! Int
                           // let code = 0
                            let vc = self.storyboard?.instantiateViewController(withIdentifier: "principal") as! ViewController
                            if(code == 101){
                                vc.faceLog = 1
                                vc.BUC = self.BUC
                                
                            }else if(code == 403){
                                vc.faceLog = 3
                                vc.nameface = dato["name"] as! String
                                vc.idface = dato["id"] as! String
                                vc.emailface = dato["email"] as! String
                                
                            }else if(code == 200){
                                vc.faceLog = 2
                                vc.nameface = dato["name"] as! String
                                vc.idface = dato["id"] as! String
                                vc.emailface = dato["email"] as! String
                            }
                            
                            self.present(vc, animated: false, completion: nil)
                           
                        })
                        
                    }
                    
                    
                    
                }catch{
                    
                }
                /*   let vc = self.storyboard?.instantiateViewController(withIdentifier: "principal") as! ViewController
                 vc.faceLog = true
                 vc.nameface = dato["name"] as! String
                 vc.idface = dato["id"] as! String
                 self.present(vc, animated: false, completion: nil)*/
            }
        })
        task.resume()
        
    }
    
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
