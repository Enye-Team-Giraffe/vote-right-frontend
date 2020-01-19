pragma solidity ^0.4.17;
// define a new factory which would be responsibel for deploying a new instance
contract ElectionFactory{
    struct Summary{
        address location;//the address of this newly deployed election
        string name; //generated id for this candidate
        string description; // the name of the candidate
        uint startdate; //age of this candidate
        uint enddate; //the party of this candidate
    }
    address[] public deployedElections;
    Summary[] public summaries;
    
    function createElection(string name,string description,uint startdate, uint enddate) public {       
        address newElection = new Election(msg.sender,name,description,startdate,enddate);       
        Summary memory newSummary = Summary({
            location:newElection,
            name:name,
            description:description,
            startdate:startdate,
            enddate:enddate
        });
        
        summaries.push(newSummary);
        deployedElections.push(newElection);
    }    
    function getDeployedElections() public view returns(address[]){
        return deployedElections;
    }
    
    function electionsLength() public view returns(uint){
        return summaries.length;
    }
}
// define a  function/contract which is reponsible for handling each election, this of course includes its candidates and results.
contract Election {
    ///////////////////////////////////////////////// initialise the variables and structs we are to use duting the election ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    // an election consists of two characteristics,
    // the candidates and the voters, 
    // and we need to create a proper representation
    // this defines what properties a voter should look like.
    struct Voter {
        uint age;   // Age of the candidate
        string gender; // the gender of the voter
        string latlong;  // the latitude and longitude of the vote  lat_long
        string votedCandidate; // person delegated to
    }
    // this defines what a candidate should  like
    struct Candidate{
        string id; //generated id for this candidate
        string name; // the name of the candidate
        uint age; //age of this candidate
        string party; //the party of this candidate
        string quote; //the quote of each candidate
        string pictureLink; //the link of the picture to be posted
        string education; //the highest certificate of said candidate
        int voteCount;
    }
    // create a mapping to keep track of the candidate who have voted
    mapping(string=>bool)  voted;
    mapping(string=>uint) indexes;
    // create an array to keep track of all the candidates we have
    Candidate[] public candidates;
    // create an array to keep track of all the people who have voted
    Voter[] public voters;
    // create a variable which keeps track of the current state of the election
    // it could either by 1 for initialised ,2 for started or 3 for ended
    int public electionState;
    // create a function to keep track of the manager of this election
    address public manager;
    // create descriptive details about the election
    string  nameOfElection;
    string  description;
    uint  startdate;
    uint enddate;
    uint totalVoteCount=0;
    // create a basic function that helps returns basic info about this election
    function aboutElection() public view returns (string,string,uint,uint){
        return (nameOfElection,description,startdate,enddate);
    }
    //create a modifier which is going to secure certain functions 
    // so that they can only be run be the manager of the contract
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    // create a function to initialise the election
    // this serves as a constrictor for this contract, and assigns a manager to this contract
    // also initialise the contract
    function Election(address creator,string electionName,string electionDescription,uint electionStartdate, uint electionEnddate) public{
        manager=creator;
        nameOfElection=electionName;
        description=electionDescription;
        startdate=electionStartdate;
        enddate=electionEnddate;
        electionState=1;
    }
    // first thing to do in an election is to create add to the array of candidates
    function addCandidate( string id, string name, uint age, string party,string quote, string pictureLink,string education ) public restricted{
        // make sure that the current state of the election is initialised
        require((electionState == 1) || (now < startdate ));
         Candidate memory  newCandidate = Candidate({
            id:id,
            name:name,
            age:age,
            party:party,
            quote:quote,
            pictureLink:pictureLink,
            education:education,
            voteCount:0
        });
        
        // create a mapping of generated clientId to the index it is stored in the array
        indexes[id]=candidates.length;
        candidates.push(newCandidate);     
    }
    // after adding enough candidates, the next thing to do would be to change the state of the election to started
    // so that the voting can begin
    function concludeInitialisation() public{
        electionState = 2;
    }       
    // after done adding candidates, next thing is to begin voting
    // everytime they vote add info about the voter
    function vote(string candidateId, uint age,string gender,string latlong,string phoneNumber) public {
        // election must have started and must not have finished
        require( (electionState == 2) || (now > startdate ) && (now < enddate) );
        // also to confirm that this particular person has not voted more than once.
        require( !voted[phoneNumber] );
        // retrive the index the item is stored on the array
        uint index = indexes[candidateId];
        // retrieve this candidate from it's array
        Candidate storage candidate = candidates[index];
        // increase the vote count on this candidate
        candidate.voteCount++;
        // store basic information about each voter
        // store the information abou this voter
        Voter memory  newVoter = Voter({
            age:age,
            gender:gender,
            latlong:latlong,
            votedCandidate:candidateId
        });   
        // add this person to the array of voters we currently have
        voters.push(newVoter);
        // record that this person has already voted
        voted[phoneNumber]=true;
        // increase the total vote counting
        totalVoteCount++;
    }
    // after adding enough votes, the next thing to do would be to change the state of the election to concluded
    // so that the counting scores can begin and voting can end
    function concludeVoting() public{
        electionState = 3;
    }
    ////////////////////////////////////////////////////////////////// utility functions //////////////////////////////////////////////////////////////////////////
    // function to get the length of the candidates
    function getCandidatesLength() public view returns (uint){
        return candidates.length;
    }
    // function to get the current timestamp
    function getTime() public view returns (uint){
        return now;
    }
    // function to get if a person has voted or not
    function hasVoted(string identifier) public view returns (bool){
        bool userHashasVoted = voted[identifier];
        return userHashasVoted;
    }
    // function to get voters length
    function getVotersLength() public view returns (uint){
        return voters.length;
    }
    // function to get all the stats of an election
    function getStats() public view returns(uint,uint,string,int){
        uint localNumCandidate=candidates.length;
        if(localNumCandidate>0){
            uint leadingCandidate=0;
            for (uint i=1;i<candidates.length;i++){
                if(candidates[i].voteCount>candidates[leadingCandidate].voteCount){
                    leadingCandidate=i;
                }
            }
    
            int localLeadingCandidateVote = candidates[leadingCandidate].voteCount;
            string storage localLeadingCandidateName = candidates[leadingCandidate].name;
    
            return (localNumCandidate,totalVoteCount,localLeadingCandidateName,localLeadingCandidateVote);
        }
        else{
            return (0,0,"",0);
        }   
    }
}