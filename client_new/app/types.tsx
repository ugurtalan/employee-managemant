export type record= {
    date: string;
    startTime: string;
    endTime: string;
    topics: string;
    detail:string;
  }

export type employee = {
  id: number;
  name: string;
  role: string;
  username: string;
  password: string;
  records: record[];
};
  
export type analyze = {
  totalWorkHour:number;
  averageWorkHour:number;
  MostWorkedTopic:string;
  lastAdded:string;
  totalDay:number;
}

export type assignment = {
  topic :string;
 fromWho : string;
 toWho : string;
 assignmentDate: string;
 details : string;
 isCompleted: boolean;
 id:number;
 seen:false;

}



  ;